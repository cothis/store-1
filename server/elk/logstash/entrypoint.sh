#!/bin/sh
echo "before sleep"
sleep 20s
echo "awaken"
curl -XPUT "elasticsearch:9200/store" -H 'Content-Type: application/json' -d'
{
  "settings": {
    "analysis": {
      "analyzer": { 
        "autocomplete": {
          "tokenizer": "autocomplete",
          "filter": [
            "lowercase"
          ]
        },
        "autocomplete_search": {
          "tokenizer": "lowercase"
        }
      },
      "tokenizer": {
        "autocomplete": {
          "type": "edge_ngram",
          "min_gram": 2,
          "max_gram": 20,
          "token_chars": [
            "letter",
            "digit"
          ]
        }
      }
    }
  },
  "mappings": { 
    "properties": {
      "title": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        },
        "analyzer": "autocomplete", 
        "search_analyzer": "autocomplete_search" 
      }
    }
  }
}'

/usr/share/logstash/bin/logstash -f /usr/share/logstash/pipeline/logstash.conf
