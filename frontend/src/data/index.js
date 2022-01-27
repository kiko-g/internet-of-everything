export const factories = [
  [
    {
      id: "machine1",
      status: 0,
      defectProbability: 0.74,
      input: "material1",
      output: "material2",
      timePerBatch: 1000,
      prevMachineID: "null",
      nextMachineID: "machine2",
      sensors: [
        {
          id: "temperature1",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 70,
              max: 120,
              avg: 90,
              standardDeviation: 2,
            },
          },
        },
        {
          id: "position1",
          type: "POSITION",
          attributes: {
            x: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
            y: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
          },
        },
        {
          id: "velocity1",
          type: "VELOCITY",
          attributes: {
            velocity: {
              min: 50,
              max: 120,
              avg: 100,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "vibration1",
          type: "VIBRATION",
          attributes: {
            vibration: {
              min: 5,
              max: 2,
              avg: 3.2,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "speed1",
          type: "SPEED",
          attributes: {
            productionSpeed: {
              max: 60,
              min: 0,
              avg: 23.5,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "energy1",
          type: "ENERGY",
          attributes: {
            energy: {
              max: 60,
              min: 20,
              avg: 40,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "orientation1",
          type: "ORIENTATION",
          attributes: {
            orientation: {
              max: 360,
              min: 0,
              avg: 40.5,
              standardDeviation: 9,
            },
          },
        },
        {
          id: "temperature2",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 60,
              max: 110,
              avg: 95,
              standardDeviation: 2,
            },
          },
        },
      ],
    },
    {
      id: "machine2",
      status: 0,
      defectProbability: 0.34,
      input: "material2",
      output: "material3",
      timePerBatch: 1000,
      prevMachineID: "machine1",
      nextMachineID: "machine3",
      sensors: [
        {
          id: "temperature1",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 70,
              max: 120,
              avg: 90,
              standardDeviation: 2,
            },
          },
        },
        {
          id: "position1",
          type: "POSITION",
          attributes: {
            x: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
            y: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
          },
        },
        {
          id: "velocity1",
          type: "VELOCITY",
          attributes: {
            velocity: {
              min: 50,
              max: 120,
              avg: 100,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "vibration1",
          type: "VIBRATION",
          attributes: {
            vibration: {
              min: 5,
              max: 2,
              avg: 3.2,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "speed1",
          type: "SPEED",
          attributes: {
            productionSpeed: {
              max: 60,
              min: 0,
              avg: 23.5,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "energy1",
          type: "ENERGY",
          attributes: {
            energy: {
              max: 60,
              min: 20,
              avg: 40,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "orientation1",
          type: "ORIENTATION",
          attributes: {
            orientation: {
              max: 360,
              min: 0,
              avg: 40.5,
              standardDeviation: 9,
            },
          },
        },
        {
          id: "temperature2",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 60,
              max: 110,
              avg: 95,
              standardDeviation: 2,
            },
          },
        },
      ],
    },
    {
      id: "machine3",
      status: 1,
      defectProbability: 1.03,
      input: "material3",
      output: "material4",
      timePerBatch: 1000,
      prevMachineID: "machine2",
      nextMachineID: "machine4",
      sensors: [
        {
          id: "temperature1",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 70,
              max: 120,
              avg: 90,
              standardDeviation: 2,
            },
          },
        },
        {
          id: "position1",
          type: "POSITION",
          attributes: {
            x: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
            y: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
          },
        },
        {
          id: "velocity1",
          type: "VELOCITY",
          attributes: {
            velocity: {
              min: 50,
              max: 120,
              avg: 100,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "vibration1",
          type: "VIBRATION",
          attributes: {
            vibration: {
              min: 5,
              max: 2,
              avg: 3.2,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "speed1",
          type: "SPEED",
          attributes: {
            productionSpeed: {
              max: 60,
              min: 0,
              avg: 23.5,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "energy1",
          type: "ENERGY",
          attributes: {
            energy: {
              max: 60,
              min: 20,
              avg: 40,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "orientation1",
          type: "ORIENTATION",
          attributes: {
            orientation: {
              max: 360,
              min: 0,
              avg: 40.5,
              standardDeviation: 9,
            },
          },
        },
        {
          id: "temperature2",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 60,
              max: 110,
              avg: 95,
              standardDeviation: 2,
            },
          },
        },
      ],
    },
    {
      id: "machine4",
      status: 1,
      defectProbability: 5.02,
      input: "material4",
      output: "material5",
      timePerBatch: 1000,
      prevMachineID: "machine3",
      nextMachineID: "machine5",
      sensors: [
        {
          id: "temperature1",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 70,
              max: 120,
              avg: 90,
              standardDeviation: 2,
            },
          },
        },
        {
          id: "position1",
          type: "POSITION",
          attributes: {
            x: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
            y: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
          },
        },
        {
          id: "velocity1",
          type: "VELOCITY",
          attributes: {
            velocity: {
              min: 50,
              max: 120,
              avg: 100,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "vibration1",
          type: "VIBRATION",
          attributes: {
            vibration: {
              min: 5,
              max: 2,
              avg: 3.2,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "speed1",
          type: "SPEED",
          attributes: {
            productionSpeed: {
              max: 60,
              min: 0,
              avg: 23.5,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "energy1",
          type: "ENERGY",
          attributes: {
            energy: {
              max: 60,
              min: 20,
              avg: 40,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "orientation1",
          type: "ORIENTATION",
          attributes: {
            orientation: {
              max: 360,
              min: 0,
              avg: 40.5,
              standardDeviation: 9,
            },
          },
        },
        {
          id: "temperature2",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 60,
              max: 110,
              avg: 95,
              standardDeviation: 2,
            },
          },
        },
      ],
    },
    {
      id: "machine5",
      status: 0,
      defectProbability: 2.48,
      input: "material5",
      output: "material6",
      timePerBatch: 1000,
      prevMachineID: "machine4",
      nextMachineID: "machine6",
      sensors: [
        {
          id: "temperature1",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 70,
              max: 120,
              avg: 90,
              standardDeviation: 2,
            },
          },
        },
        {
          id: "position1",
          type: "POSITION",
          attributes: {
            x: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
            y: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
          },
        },
        {
          id: "velocity1",
          type: "VELOCITY",
          attributes: {
            velocity: {
              min: 50,
              max: 120,
              avg: 100,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "vibration1",
          type: "VIBRATION",
          attributes: {
            vibration: {
              min: 5,
              max: 2,
              avg: 3.2,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "speed1",
          type: "SPEED",
          attributes: {
            productionSpeed: {
              max: 60,
              min: 0,
              avg: 23.5,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "energy1",
          type: "ENERGY",
          attributes: {
            energy: {
              max: 60,
              min: 20,
              avg: 40,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "orientation1",
          type: "ORIENTATION",
          attributes: {
            orientation: {
              max: 360,
              min: 0,
              avg: 40.5,
              standardDeviation: 9,
            },
          },
        },
        {
          id: "temperature2",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 60,
              max: 110,
              avg: 95,
              standardDeviation: 2,
            },
          },
        },
      ],
    },
    {
      id: "machine6",
      status: 1,
      defectProbability: 4.21,
      input: "material6",
      output: "material7",
      timePerBatch: 1000,
      prevMachineID: "machine5",
      nextMachineID: "machine7",
      sensors: [
        {
          id: "temperature1",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 70,
              max: 120,
              avg: 90,
              standardDeviation: 2,
            },
          },
        },
        {
          id: "position1",
          type: "POSITION",
          attributes: {
            x: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
            y: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
          },
        },
        {
          id: "velocity1",
          type: "VELOCITY",
          attributes: {
            velocity: {
              min: 50,
              max: 120,
              avg: 100,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "vibration1",
          type: "VIBRATION",
          attributes: {
            vibration: {
              min: 5,
              max: 2,
              avg: 3.2,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "speed1",
          type: "SPEED",
          attributes: {
            productionSpeed: {
              max: 60,
              min: 0,
              avg: 23.5,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "energy1",
          type: "ENERGY",
          attributes: {
            energy: {
              max: 60,
              min: 20,
              avg: 40,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "orientation1",
          type: "ORIENTATION",
          attributes: {
            orientation: {
              max: 360,
              min: 0,
              avg: 40.5,
              standardDeviation: 9,
            },
          },
        },
        {
          id: "temperature2",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 60,
              max: 110,
              avg: 95,
              standardDeviation: 2,
            },
          },
        },
      ],
    },
    {
      id: "machine7",
      status: 0,
      defectProbability: 1.31,
      input: "material7",
      output: "material8",
      timePerBatch: 1000,
      prevMachineID: "machine6",
      nextMachineID: "machine8",
      sensors: [
        {
          id: "temperature1",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 70,
              max: 120,
              avg: 90,
              standardDeviation: 2,
            },
          },
        },
        {
          id: "position1",
          type: "POSITION",
          attributes: {
            x: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
            y: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
          },
        },
        {
          id: "velocity1",
          type: "VELOCITY",
          attributes: {
            velocity: {
              min: 50,
              max: 120,
              avg: 100,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "vibration1",
          type: "VIBRATION",
          attributes: {
            vibration: {
              min: 5,
              max: 2,
              avg: 3.2,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "speed1",
          type: "SPEED",
          attributes: {
            productionSpeed: {
              max: 60,
              min: 0,
              avg: 23.5,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "energy1",
          type: "ENERGY",
          attributes: {
            energy: {
              max: 60,
              min: 20,
              avg: 40,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "orientation1",
          type: "ORIENTATION",
          attributes: {
            orientation: {
              max: 360,
              min: 0,
              avg: 40.5,
              standardDeviation: 9,
            },
          },
        },
        {
          id: "temperature2",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 60,
              max: 110,
              avg: 95,
              standardDeviation: 2,
            },
          },
        },
      ],
    },
    {
      id: "machine8",
      status: 0,
      defectProbability: 3.74,
      input: "material8",
      output: "material9",
      timePerBatch: 1000,
      prevMachineID: "machine7",
      nextMachineID: "machine9",
      sensors: [
        {
          id: "temperature1",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 70,
              max: 120,
              avg: 90,
              standardDeviation: 2,
            },
          },
        },
        {
          id: "position1",
          type: "POSITION",
          attributes: {
            x: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
            y: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
          },
        },
        {
          id: "velocity1",
          type: "VELOCITY",
          attributes: {
            velocity: {
              min: 50,
              max: 120,
              avg: 100,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "vibration1",
          type: "VIBRATION",
          attributes: {
            vibration: {
              min: 5,
              max: 2,
              avg: 3.2,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "speed1",
          type: "SPEED",
          attributes: {
            productionSpeed: {
              max: 60,
              min: 0,
              avg: 23.5,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "energy1",
          type: "ENERGY",
          attributes: {
            energy: {
              max: 60,
              min: 20,
              avg: 40,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "orientation1",
          type: "ORIENTATION",
          attributes: {
            orientation: {
              max: 360,
              min: 0,
              avg: 40.5,
              standardDeviation: 9,
            },
          },
        },
        {
          id: "temperature2",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 60,
              max: 110,
              avg: 95,
              standardDeviation: 2,
            },
          },
        },
      ],
    },
    {
      id: "machine9",
      status: 0,
      defectProbability: 1.52,
      input: "material9",
      output: "material10",
      timePerBatch: 1000,
      prevMachineID: "machine8",
      nextMachineID: "null",
      sensors: [
        {
          id: "temperature1",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 70,
              max: 120,
              avg: 90,
              standardDeviation: 2,
            },
          },
        },
        {
          id: "position1",
          type: "POSITION",
          attributes: {
            x: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
            y: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
          },
        },
        {
          id: "velocity1",
          type: "VELOCITY",
          attributes: {
            velocity: {
              min: 50,
              max: 120,
              avg: 100,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "vibration1",
          type: "VIBRATION",
          attributes: {
            vibration: {
              min: 5,
              max: 2,
              avg: 3.2,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "speed1",
          type: "SPEED",
          attributes: {
            productionSpeed: {
              max: 60,
              min: 0,
              avg: 23.5,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "energy1",
          type: "ENERGY",
          attributes: {
            energy: {
              max: 60,
              min: 20,
              avg: 40,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "orientation1",
          type: "ORIENTATION",
          attributes: {
            orientation: {
              max: 360,
              min: 0,
              avg: 40.5,
              standardDeviation: 9,
            },
          },
        },
        {
          id: "temperature2",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 60,
              max: 110,
              avg: 95,
              standardDeviation: 2,
            },
          },
        },
      ],
    },
  ],
  [
    {
      id: "machine5",
      status: 0,
      defectProbability: 2.48,
      input: "material5",
      output: "material6",
      timePerBatch: 1000,
      prevMachineID: "null",
      nextMachineID: "machine6",
      sensors: [
        {
          id: "temperature1",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 70,
              max: 120,
              avg: 90,
              standardDeviation: 2,
            },
          },
        },
        {
          id: "position1",
          type: "POSITION",
          attributes: {
            x: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
            y: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
          },
        },
        {
          id: "velocity1",
          type: "VELOCITY",
          attributes: {
            velocity: {
              min: 50,
              max: 120,
              avg: 100,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "vibration1",
          type: "VIBRATION",
          attributes: {
            vibration: {
              min: 5,
              max: 2,
              avg: 3.2,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "speed1",
          type: "SPEED",
          attributes: {
            productionSpeed: {
              max: 60,
              min: 0,
              avg: 23.5,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "energy1",
          type: "ENERGY",
          attributes: {
            energy: {
              max: 60,
              min: 20,
              avg: 40,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "orientation1",
          type: "ORIENTATION",
          attributes: {
            orientation: {
              max: 360,
              min: 0,
              avg: 40.5,
              standardDeviation: 9,
            },
          },
        },
        {
          id: "temperature2",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 60,
              max: 110,
              avg: 95,
              standardDeviation: 2,
            },
          },
        },
      ],
    },
    {
      id: "machine6",
      status: 1,
      defectProbability: 4.21,
      input: "material6",
      output: "material7",
      timePerBatch: 1000,
      prevMachineID: "machine5",
      nextMachineID: "machine7",
      sensors: [
        {
          id: "temperature1",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 70,
              max: 120,
              avg: 90,
              standardDeviation: 2,
            },
          },
        },
        {
          id: "position1",
          type: "POSITION",
          attributes: {
            x: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
            y: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
          },
        },
        {
          id: "velocity1",
          type: "VELOCITY",
          attributes: {
            velocity: {
              min: 50,
              max: 120,
              avg: 100,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "vibration1",
          type: "VIBRATION",
          attributes: {
            vibration: {
              min: 5,
              max: 2,
              avg: 3.2,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "speed1",
          type: "SPEED",
          attributes: {
            productionSpeed: {
              max: 60,
              min: 0,
              avg: 23.5,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "energy1",
          type: "ENERGY",
          attributes: {
            energy: {
              max: 60,
              min: 20,
              avg: 40,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "orientation1",
          type: "ORIENTATION",
          attributes: {
            orientation: {
              max: 360,
              min: 0,
              avg: 40.5,
              standardDeviation: 9,
            },
          },
        },
        {
          id: "temperature2",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 60,
              max: 110,
              avg: 95,
              standardDeviation: 2,
            },
          },
        },
      ],
    },
    {
      id: "machine7",
      status: 0,
      defectProbability: 1.31,
      input: "material7",
      output: "material8",
      timePerBatch: 1000,
      prevMachineID: "machine6",
      nextMachineID: "machine8",
      sensors: [
        {
          id: "temperature1",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 70,
              max: 120,
              avg: 90,
              standardDeviation: 2,
            },
          },
        },
        {
          id: "position1",
          type: "POSITION",
          attributes: {
            x: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
            y: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
          },
        },
        {
          id: "velocity1",
          type: "VELOCITY",
          attributes: {
            velocity: {
              min: 50,
              max: 120,
              avg: 100,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "vibration1",
          type: "VIBRATION",
          attributes: {
            vibration: {
              min: 5,
              max: 2,
              avg: 3.2,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "speed1",
          type: "SPEED",
          attributes: {
            productionSpeed: {
              max: 60,
              min: 0,
              avg: 23.5,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "energy1",
          type: "ENERGY",
          attributes: {
            energy: {
              max: 60,
              min: 20,
              avg: 40,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "orientation1",
          type: "ORIENTATION",
          attributes: {
            orientation: {
              max: 360,
              min: 0,
              avg: 40.5,
              standardDeviation: 9,
            },
          },
        },
        {
          id: "temperature2",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 60,
              max: 110,
              avg: 95,
              standardDeviation: 2,
            },
          },
        },
      ],
    },
    {
      id: "machine8",
      status: 0,
      defectProbability: 3.74,
      input: "material8",
      output: "material9",
      timePerBatch: 1000,
      prevMachineID: "machine7",
      nextMachineID: "machine9",
      sensors: [
        {
          id: "temperature1",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 70,
              max: 120,
              avg: 90,
              standardDeviation: 2,
            },
          },
        },
        {
          id: "position1",
          type: "POSITION",
          attributes: {
            x: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
            y: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
          },
        },
        {
          id: "velocity1",
          type: "VELOCITY",
          attributes: {
            velocity: {
              min: 50,
              max: 120,
              avg: 100,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "vibration1",
          type: "VIBRATION",
          attributes: {
            vibration: {
              min: 5,
              max: 2,
              avg: 3.2,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "speed1",
          type: "SPEED",
          attributes: {
            productionSpeed: {
              max: 60,
              min: 0,
              avg: 23.5,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "energy1",
          type: "ENERGY",
          attributes: {
            energy: {
              max: 60,
              min: 20,
              avg: 40,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "orientation1",
          type: "ORIENTATION",
          attributes: {
            orientation: {
              max: 360,
              min: 0,
              avg: 40.5,
              standardDeviation: 9,
            },
          },
        },
        {
          id: "temperature2",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 60,
              max: 110,
              avg: 95,
              standardDeviation: 2,
            },
          },
        },
      ],
    },
    {
      id: "machine9",
      status: 0,
      defectProbability: 1.52,
      input: "material9",
      output: "material10",
      timePerBatch: 1000,
      prevMachineID: "machine8",
      nextMachineID: "null",
      sensors: [
        {
          id: "temperature1",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 70,
              max: 120,
              avg: 90,
              standardDeviation: 2,
            },
          },
        },
        {
          id: "position1",
          type: "POSITION",
          attributes: {
            x: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
            y: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
          },
        },
        {
          id: "velocity1",
          type: "VELOCITY",
          attributes: {
            velocity: {
              min: 50,
              max: 120,
              avg: 100,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "vibration1",
          type: "VIBRATION",
          attributes: {
            vibration: {
              min: 5,
              max: 2,
              avg: 3.2,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "speed1",
          type: "SPEED",
          attributes: {
            productionSpeed: {
              max: 60,
              min: 0,
              avg: 23.5,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "energy1",
          type: "ENERGY",
          attributes: {
            energy: {
              max: 60,
              min: 20,
              avg: 40,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "orientation1",
          type: "ORIENTATION",
          attributes: {
            orientation: {
              max: 360,
              min: 0,
              avg: 40.5,
              standardDeviation: 9,
            },
          },
        },
        {
          id: "temperature2",
          type: "TEMPERATURE",
          attributes: {
            temperature: {
              min: 60,
              max: 110,
              avg: 95,
              standardDeviation: 2,
            },
          },
        },
      ],
    },
  ],
  [
    {
      id: "machineX",
      status: 0,
      defectProbability: 52,
      input: "material1",
      output: "material2",
      timePerBatch: 1000,
      prevMachineID: "null",
      nextMachineID: "null",
      sensors: [
        {
          id: "temperature1",
          type: "TEMPERATURE",
          updateInterval: 1000,
          attributes: {
            temperature: {
              min: 70,
              max: 120,
              avg: 90,
              standardDeviation: 2,
            },
          },
        },
        {
          id: "position1",
          type: "POSITION",
          updateInterval: 2000,
          attributes: {
            x: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
            y: {
              min: 0,
              max: 20,
              avg: 10,
              standardDeviation: 7,
            },
          },
        },
        {
          id: "velocity1",
          type: "VELOCITY",
          updateInterval: 4000,
          attributes: {
            velocity: {
              min: 50,
              max: 120,
              avg: 100,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "vibration1",
          type: "VIBRATION",
          updateInterval: 2500,
          attributes: {
            vibration: {
              min: 5,
              max: 2,
              avg: 3.2,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "productionSpeed1",
          type: "PRODUCTION_SPEED",
          updateInterval: 1000,
          attributes: {
            productionSpeed: {
              max: 60,
              min: 0,
              avg: 23.5,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "energy1",
          type: "ENERGY",
          updateInterval: 1000,
          attributes: {
            energy: {
              max: 60,
              min: 20,
              avg: 40,
              standardDeviation: 1,
            },
          },
        },
        {
          id: "orientation1",
          type: "ORIENTATION",
          updateInterval: 100,
          attributes: {
            orientation: {
              max: 360,
              min: 0,
              avg: 40.5,
              standardDeviation: 9,
            },
          },
        },
        {
          id: "temperature2",
          type: "TEMPERATURE",
          updateInterval: 200,
          attributes: {
            temperature: {
              min: 60,
              max: 110,
              avg: 95,
              standardDeviation: 2,
            },
          },
        },
      ],
    },
  ],
]
