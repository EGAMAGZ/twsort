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
  .option("-t,--tailwind-config [path:string]", "Tailwind CSS config path.")
  .option("-a,--attributes [attribute: string]", "Class attributes to sort.")
  .option("-p,--preserve-duplicates", "Preserve duplicate classes.", {
    default: false,
  })
  .option("-c,--check", "Check if the classes are sorted.", {
    default: false,
  })
  .arguments("[files...:string]")
  .action((options, ...args) => {
    console.log(options, args);
  });

if (import.meta.main) {
  await command.parse(Deno.args);
}
