import {
	ActivityCreate,
	activityRead,
	manageActivityCreate,
	manageActivityDelete,
	manageActivityPartialUpdate,
} from "@/api";
import {
	Button,
	Cell,
	DatetimePicker,
	Empty,
	Field,
	Form,
	Input,
	Popup,
	SafeArea,
	Stepper,
	Textarea,
} from "@taroify/core";
import { DatetimePickerProps } from "@taroify/core/datetime-picker/datetime-picker";
import { FieldProps } from "@taroify/core/field/field";
import { View } from "@tarojs/components";
import { useBoolean, useMemoizedFn, useRequest } from "ahooks";
import dayjs from "dayjs";
import { inRange, isNil } from "lodash-es";
import { FC, ReactNode } from "react";
import { showActionSheet, reLaunch, useRouter, showModal } from "@tarojs/taro";
import { DateFormat } from "@/shared/constants";
import { routeBack } from "@/shared/route";
import { showToastAsync, wrapPromiseWith } from "@/shared/utils";

definePageConfig({
	navigationBarTitleText: "创建活动",
});

const DatePicker: FC<
	DatetimePickerProps & { onBlur?: (value?: Date) => void }
> = (props) => {
	const { children, onChange, onBlur, ...rest } = props;

	const [open, { setTrue, setFalse }] = useBoolean();

	const picker = (
		<Popup placement="bottom" onClose={setFalse} open={open} rounded>
			<DatetimePicker
				{...rest}
				onCancel={() => {
					setFalse();
					onBlur?.(rest.value);
				}}
				onConfirm={(e) => {
					onChange?.(e);
					setFalse();
					onBlur?.(e);
				}}
			/>
			<SafeArea position="bottom" />
		</Popup>
	);

	const trigger = <View onClick={setTrue}>{children}</View>;

	return (
		<>
			{trigger}
			{picker}
		</>
	);
};

export default function () {
	const { params } = useRouter();

	const { id } = params;

	const isCreation = isNil(id);

	const { data } = useRequest(activityRead, {
		defaultParams: [Number(id)],
		ready: !!id,
	});

	const { run: updateActivity } = useRequest(manageActivityPartialUpdate, {
		manual: true,
		async onSuccess() {
			await showToastAsync({
				title: "更新成功",
				icon: "success",
			});

			routeBack();
		},
	});

	const { run: deleteActivity } = useRequest(manageActivityDelete, {
		manual: true,
		async onSuccess() {
			await showToastAsync({
				title: "删除成功",
				icon: "success",
			});

			routeBack({ step: 2 });
		},
	});

	const { run } = useRequest(manageActivityCreate, {
		manual: true,
		onSuccess() {
			reLaunch({
				url: "/pages/history/index",
			});
		},
	});

	const datePickerRender = useMemoizedFn<
		Exclude<FieldProps["children"], ReactNode | undefined>
	>(({ value, onChange, onBlur }) => {
		const innerValue = dayjs(value).isValid()
			? dayjs(value).toDate()
			: new Date();

		const displayValue = dayjs(value).isValid()
			? dayjs(value).format(DateFormat.Display)
			: "";

		return (
			<DatePicker
				defaultValue={innerValue}
				onChange={onChange}
				type="date-minute"
				min={new Date()}
				max={dayjs().add(1, "year").toDate()}
				onBlur={onBlur}
			>
				<Input value={displayValue} readonly placeholder="请选择开始时间" />
			</DatePicker>
		);
	});

	const handleDeleteActivity = () => {
		showModal({
			title: "提示",
			content: `确定删除活动：${data?.name}吗`,
			success: function (res) {
				if (res.confirm) {
					deleteActivity(Number(id));
				}
			},
		});
	};

	const form = (
		<Form
			controlAlign="right"
			onSubmit={(e) => {
				const entity = e.detail.value as unknown as ActivityCreate;

				const { start_time, end_time, capacity } = entity;

				if (dayjs(start_time).isAfter(end_time, "minute")) {
					showModal({
						title: "提示",
						content: "请选择正确的结束时间",
					});
					return;
				}

				if (id) {
					if (data?.get_attenders_count! > capacity) {
						showModal({
							title: "提示",
							content: "请修改活动名额以大于已报名学生数量",
						});
					} else {
						updateActivity(Number(id), entity);
					}
				} else {
					run(entity);
				}
			}}
		>
			<Cell.Group>
				<Field
					label="活动名称"
					name="name"
					rules={[
						{
							required: true,
							pattern: /^.{1,50}$/,
							message: "请输入正确的活动名称",
						},
					]}
					defaultValue={data?.name}
				>
					<Input placeholder="请输入活动名称" />
				</Field>
				<Field
					label="活动类别"
					clickable
					isLink
					name="type"
					rules={[
						{
							required: true,
							message: "请选择正确的活动类别",
						},
					]}
					defaultValue={data?.type}
				>
					{({ value, onChange, onBlur }) => {
						return (
							<Input
								placeholder="请选择活动类型"
								readonly
								value={value}
								onClick={async () => {
									const [error, result] = await wrapPromiseWith(
										showActionSheet,
									)({
										itemList: [0, 1, 2, 3].map((num) => num.toString()),
									});

									if (error) {
										onBlur?.(value);
										return;
									}
									const { tapIndex } = result;
									onChange?.(tapIndex);
									onBlur?.(tapIndex);
								}}
							/>
						);
					}}
				</Field>
				<Field
					label="活动名额"
					name="capacity"
					rules={[
						{
							required: true,
							validator(value) {
								const intValue = +value;

								return (
									!Number.isNaN(intValue) && inRange(intValue, 1, 4294967295)
								);
							},
							message: "请输入正确的活动名额",
						},
					]}
					defaultValue={data?.capacity || 10}
				>
					<Stepper min={1} max={4294967295} precision={0} className="ml-auto">
						<Stepper.Button />
						<Stepper.Input width={80} />
						<Stepper.Button />
					</Stepper>
				</Field>
				<Field
					label="地点"
					name="location"
					rules={[
						{
							required: true,
							pattern: /^.{1,50}$/,
							message: "请输入正确的活动名称",
						},
					]}
					defaultValue={data?.location}
				>
					<Input placeholder="请输入活动地点" />
				</Field>

				<Field
					label="开始时间"
					name="start_time"
					rules={[
						{
							required: true,
							message: "请选择正确的开始时间",
						},
					]}
					defaultValue={data?.start_time}
				>
					{datePickerRender}
				</Field>

				<Field
					label="结束时间"
					name="end_time"
					rules={[
						{
							required: true,
							message: "请选择正确的结束时间",
						},
					]}
					defaultValue={data?.end_time}
				>
					{datePickerRender}
				</Field>

				<Field
					name="description"
					rules={[
						{
							required: true,
							pattern: /^.{1,10240}$/,
							message: "请输入正确的活动描述",
						},
					]}
					defaultValue={data?.description}
				>
					<Textarea
						placeholder="请输入活动描述"
						autoHeight
						maxlength={10240}
						limit={10240}
					/>
				</Field>
			</Cell.Group>
			<View className="p-4 flex flex-col gap-4">
				<Button block color="primary" formType="submit">
					提交
				</Button>

				{!isCreation && (
					<Button
						block
						color="primary"
						formType="button"
						variant="outlined"
						onClick={handleDeleteActivity}
					>
						删除
					</Button>
				)}
			</View>
			<SafeArea position="bottom" />
		</Form>
	);

	return <View>{isCreation ? form : data ? form : <Empty />}</View>;
}
