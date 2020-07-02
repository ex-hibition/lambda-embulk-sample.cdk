FROM lambci/lambda:build-provided

WORKDIR /tmp 

COPY ./ojdbc8.jar oracle/
COPY ./embulk-latest.jar .
COPY ./config.yml .
COPY ./sample_01.csv.gz .

# embulkインストール
# RUN curl --create-dirs -o /tmp/embulk/bin/embulk -L "https://dl.embulk.org/embulk-latest.jar" && \
ENV PATH=/tmp/embulk/bin:$PATH
RUN mkdir -p /tmp/embulk/bin && mv embulk-latest.jar /tmp/embulk/bin/embulk && \
    chmod +x /tmp/embulk/bin/embulk && \
    echo -e "source 'https://rubygems.org/'\ngem 'embulk'\ngem 'embulk-input-oracle'\ngem 'embulk-output-s3'" > embulk/Gemfile && \
    mkdir embulk/.bundle && echo -e "BUNDLE_PATH: ../vendor/bundle\nBUNDLE_DISABLE_SHARED_GEMS: '1'" > embulk/.bundle/config && \
    (cd embulk; embulk bundle --path ../vendor/bundle)

WORKDIR /var/task
CMD mv /tmp/embulk . && \
    mv /tmp/vendor . && \
    mv /tmp/oracle . && \
    chmod +x bootstrap function.sh && \
    zip -9yr function.zip function.sh config.yml sample_01.csv.gz && \
    zip -9yr embulk.zip bootstrap embulk/ vendor/ oracle/