export const factories = [
  [
    {
      id: "machine1",
      status: 0,
      defectProbability: 0.74,
      input: "material1",
      output: "material2",
      pevMachineID: "null",
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
      pevMachineID: "machine2",
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
      status: 0,
      defectProbability: 1.03,
      input: "material3",
      output: "material4",
      pevMachineID: "machine2",
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
      pevMachineID: "machine3",
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
      pevMachineID: "machine4",
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
      pevMachineID: "machine5",
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
      pevMachineID: "machine6",
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
      pevMachineID: "machine7",
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
      pevMachineID: "machine8",
      nextMachineID: "machine10",
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
      id: "machine1",
      status: 0,
      defectProbability: 0.74,
      input: "material1",
      output: "material2",
      pevMachineID: "null",
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
      pevMachineID: "machine2",
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
      status: 0,
      defectProbability: 1.03,
      input: "material3",
      output: "material4",
      pevMachineID: "machine2",
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
      pevMachineID: "machine3",
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
      pevMachineID: "machine4",
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
      pevMachineID: "machine5",
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
      pevMachineID: "machine6",
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
  ],
]
