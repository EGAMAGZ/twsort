import { Command } from "@cliffy/command";
import { DESCRIPTION, NAME } from "@/util/constant.ts";

export async function version() {
  const { default: configs } = await import("./deno.json", {
    with: {
      type: "json",
    },
  });
  console.log(`${NAME} v${configs.version}`);
}

await new Command()
  .name(NAME)
  .description(DESCRIPTION)
  .versionOption("-v, --version", "Print version info.", version)
  .parse(Deno.args);
