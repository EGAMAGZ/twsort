import { Command } from "@cliffy/command";
import { DESCRIPTION, NAME } from "@/util/constant.ts";
import { colors } from "@cliffy/ansi/colors";
import { getTwSortConfig } from "@/config.ts";

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
  .option("--config <path:string>", "TwSort config path.")
  .option("--tailwind-config <path:string>", "Tailwind CSS config path.")
  .option("-a,--attributes <attributes>", "Class attributes to sort.")
  .option("-p,--preserve-duplicates", "Preserve duplicate classes.", {
    default: false,
  })
  .option("-c,--check", "Check if the classes are sorted.", {
    default: false,
  })
  .arguments("[files...:string]")
  .action((options, ...args) => {
	  getTwSortConfig(options.config)
    console.log(options, args);
  });

if (import.meta.main) {
  await command.parse(Deno.args);
}
