import { existsSync } from "@gnome/fs";
import { ValidationError } from "@cliffy/flags";

export function getTwSortConfig(path?: string) {
	if (path && !existsSync(path)) {
		throw new ValidationError("ASDSD");
	}
}
