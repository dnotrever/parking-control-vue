FROM ubuntu:22.04

WORKDIR /app
COPY . /app

RUN adduser --disabled-password --gecos '' appuser && \
    chown -R appuser /app

RUN apt-get update && apt-get install -y \
    nano \
    curl \
    zip \
    unzip \
    git

RUN curl -fsSL https://deb.nodesource.com/setup_21.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g npm@10.4

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

USER appuser

CMD ["tail", "-f", "/dev/null"]
