FROM  python:3
LABEL vertical="chaos_engineering"

# Prepare python project
RUN mkdir -p /chaos_engineering/
WORKDIR /chaos_engineering/
COPY src/ src/
COPY requirements.txt requirements.txt
COPY .env.docker .env
RUN pip install -r requirements.txt