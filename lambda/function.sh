function handler () {
  EVENT_DATA=$1
  echo "$EVENT_DATA" 1>&2;
  RESPONSE="Echoing request: '$EVENT_DATA'"

  echo $RESPONSE

  # echo $(/opt/embulk/bin/embulk run -b /opt/embulk -l debug config.yml 1>&2)
  echo $(/opt/embulk/bin/embulk run -b /opt/embulk -l debug --help 1>&2)
}