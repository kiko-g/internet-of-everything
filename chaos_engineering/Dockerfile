FROM  python:3
LABEL vertical="chaos_engineering"

# Prepare python project
RUN mkdir -p /chaos_engineering/
WORKDIR /chaos_engineering/
COPY . .
RUN pip install -r requirements.txt