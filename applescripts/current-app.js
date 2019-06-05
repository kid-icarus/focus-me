const currentApplication = Application('System Events')
  .applicationProcesses
  .where({ frontmost: true });

// eslint-disable-next-line no-constant-condition
while (true) {
  delay(1);
  console.log(currentApplication.name());
}
