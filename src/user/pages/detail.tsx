import {
	manageGroupList,
	manageUserPartialUpdate,
	manageUserRead,
	UserProfileManageUpdate,
} from "@/api";
import { Cell, Empty, Field, Popup, Input } from "@taroify/core";
import { View } from "@tarojs/components";
import { useRouter, getWindowInfo } from "@tarojs/taro";
import { useRequest } from "ahooks";
import UserForm from "../components/UserForm";
import Feeds from "@/components/Feeds";
import withPopup from "@/components/withPopup";
import { concat } from "lodash-es";
import { FriendsOutlined } from "@taroify/icons";
import { routeBack } from "@/shared/route";

const PopupList = withPopup({
	renderContent(params) {
		const { onChange, onBlur, toggleOpen } = params;

		const { windowHeight } = getWindowInfo();

		const panelHeight = windowHeight * 0.7;

		return (
			<>
				<View className="h-10">
					<Popup.Close />
				</View>
				<Feeds
					height={panelHeight}
					disabledSearch
					service={async (params) => {
						const { results = [] } = await manageGroupList(params);
						return concat(results);
					}}
					renderContent={(list) => (
						<Cell.Group>
							{list.map((group) => (
								<Cell
									key={group.id}
									title={<View className="text-left">{group.name}</View>}
									clickable
									onClick={(e) => {
										e.stopPropagation();
										onChange?.(group);
										onBlur?.(group);
										toggleOpen(false);
									}}
								>
									{group.grade.name}
								</Cell>
							))}
						</Cell.Group>
					)}
				></Feeds>
			</>
		);
	},
});

export default function () {
	const { params } = useRouter<{
		userId?: string;
	}>();

	const { userId } = params;

	const { data: user } = useRequest(() => manageUserRead(+userId!), {
		ready: !Number.isNaN(Number(userId)),
	});

	// TODO：编辑接口不成功
	const { run } = useRequest(
		(user: UserProfileManageUpdate) => manageUserPartialUpdate(+userId!, user),
		{
			manual: true,
			ready: !Number.isNaN(Number(userId)),
			onSuccess() {
				routeBack();
			},
		},
	);

	const form = (
		<UserForm
			user={user!}
			renderAfterFields={() => {
				return (
					<Field
						icon={<FriendsOutlined />}
						label="班级"
						name="group"
						defaultValue={user?.group}
						rules={[
							{
								required: true,
								message: "请选择班级",
							},
						]}
					>
						{({ value, onChange, onBlur }) => {
							return (
								<PopupList value={value} onChange={onChange} onBlur={onBlur}>
									<Input placeholder="请选择" readonly value={value?.name} />
								</PopupList>
							);
						}}
					</Field>
				);
			}}
			onSubmit={(form) => {
				run({
					...form,
					username: form.username!,
					name: form.name!,
					phone: form.phone!,
					group: form.group?.id!,
					id: user?.id,
					isAdmin: user?.isAdmin,
					openid: user?.openid,
				});
			}}
		/>
	);

	const empty = <Empty />;

	return <View>{user ? form : empty}</View>;
}
