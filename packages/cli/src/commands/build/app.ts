export default async function main() {
  console.log("hello");
}

main().catch((error) => {
  console.error(error.stack);
  process.exit(1);
});
