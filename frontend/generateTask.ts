async function create10000Tasks() {
  for (let i = 1; i <= 10000; i++) {
    const taskData = {
      name: `Task test ${i}`,
      description: `Description for task ${i}`,
      endDate: new Date().toISOString(),
      state: 'pending',
    };

    await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
  }
}

create10000Tasks();
