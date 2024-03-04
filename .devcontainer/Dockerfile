FROM ubuntu:22.04

# Set environment variables to prevent interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Install postgres
RUN apt update && \
    apt install -y postgresql && \
    service postgresql start && \
    su - postgres sh -c "psql -U postgres -d postgres -c \"ALTER USER postgres WITH PASSWORD 'postgres'\""

RUN apt-get update && apt-get install -y python3 python3-pip

COPY requirements.txt /tmp/
RUN pip3 install -r /tmp/requirements.txt

# Install locales package
RUN apt-get update && apt-get install -y locales

# Uncomment en_US.UTF-8 for inclusion in generation
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen

# Set the locale
ENV LANG en_US.UTF-8 
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8