import { Button } from "@taroify/core";
import { View } from "@tarojs/components";
import ActivityDetailCard from "../../components/ActivityDetailCard";
import { ActivityRead } from "@/api";

const activity: ActivityRead = {
	id: 0,
	name: "crazy thursday",
	description:
		"what can i say what can i say what can i say what can i say what can i say",
	creator: {
		name: "teacher ma",
		username: "1234567890",
		phone: "13060649844",
	},
	get_attenders_count: 62,
	capacity: 70,
	location: "shenzhen university",
	start_time: "",
	end_time: "",
	type: 0,
};

export default function () {
	// const { params } = useRouter();

	// const activityId = params.id;

	return (
		<View className="flex flex-col">
			<ActivityDetailCard activityDetail={activity}></ActivityDetailCard>

			<Button color="primary" className="w-4/5 mx-auto mt-4">
				报名
			</Button>
		</View>
	);
}
