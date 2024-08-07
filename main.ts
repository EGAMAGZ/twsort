import { Command } from "@cliffy/command";
import { DESCRIPTION, NAME } from "@/util/constant.ts";
import { colors } from "@cliffy/ansi/colors";

export async function version() {
  const { default: configs } = await import("./deno.json", {
    with: {
      type: "json",
    },
  });

  const info = colors.bold.yellow;
  console.log(info(`${NAME} v${configs.version}`));
}

const command = new Command()
  .name(NAME)
  .description(DESCRIPTION)
  .versionOption("-v, --version", "Print version info.", version)
  .option("-e, --example", "Example")
  .action((options, ...args) => {
    console.log(options, args);
  });

if (import.meta.main) {
  await command.parse(Deno.args);
}
