import {
	manageUserPartialUpdate,
	manageUserRead,
	UserProfileManageUpdate,
} from "@/api";
import { Empty, Field, Input } from "@taroify/core";
import { View } from "@tarojs/components";
import { useRouter, setNavigationBarTitle } from "@tarojs/taro";
import { useRequest } from "ahooks";
import UserForm from "../components/UserForm";
import { FriendsOutlined } from "@taroify/icons";
import { routeBack } from "@/shared/route";
import GroupList from "../../manage/components/GroupList";

export default function () {
	const { params } = useRouter<{
		userId?: string;
	}>();

	const { userId } = params;

	const { data: user } = useRequest(() => manageUserRead(+userId!), {
		ready: !Number.isNaN(Number(userId)),
		onSuccess({ name }) {
			setNavigationBarTitle({ title: name });
		},
	});

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
								<GroupList value={value} onChange={onChange} onBlur={onBlur}>
									<Input placeholder="请选择" readonly value={value?.name} />
								</GroupList>
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
