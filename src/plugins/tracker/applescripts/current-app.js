const currentApplication = Application('System Events')
  .applicationProcesses
  .where({ frontmost: true });

while (true) {
  delay(1);
  console.log(currentApplication.name());
}
