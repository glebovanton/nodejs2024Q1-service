FROM ubuntu:latest
LABEL authors="antonglebov"

ENTRYPOINT ["top", "-b"]