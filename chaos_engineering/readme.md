# Chaos Engineering

## Instalation

To install the dependencies of the project just run:

```bash
$ pip install -r requirements.txt
```

## Executing

To run the tests we must first run a mock server which will simulate end product will most likely work, for that:

### **Initializing Mock Server**

```bash
$ python3 launch_mock_server.py
```

### **Running tests**

Delete data readings:

```bash
$ python3 delete_data_reading.py
```

Cause a machine to display overheating:

```bash
$ python3 display_overheating.py
```

Change the output data so that it is incoherent:

```bash
$ python3 incoherent_output_data.py
```

Modify output data of a machine:

```bash
$ python3 modify_data_format.py
```

Cause a DDOS (requires multiple computers to run this):

```bash
$ python3 ddos_overload.py
```

### **Verifying results**

To verify the results of the tests just access localhost:8000/fault?machineID=999 (change 999 for other machines)