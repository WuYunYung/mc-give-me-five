import * as path from "node:path";

export const SWAGGER_URL =
	"https://django-9h64-123700-7-1329444134.sh.run.tcloudbase.com/api/docs/?format=openapi";
export const SWAGGER_HEADERS = {
	Cookie:
		"csrftoken=Kci7cbpF5Q5U4Al5o34onoMl2ksIGkbb; sessionid=pp37bfdybgx7if5g7s03mrg6gwesr76z",
};
export const SWAGGER_OUTPUT_PATH = path.resolve(
	__dirname,
	"../../output/swagger.json",
);
