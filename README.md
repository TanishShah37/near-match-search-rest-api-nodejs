

REST API endpoint that provides auto-complete suggestions for large cities.

- The endpoint is exposed at `/suggestions`
- The partial (or complete) search term is passed as a querystring parameter `q`
- The caller's location can optionally be supplied via querystring parameters `latitude` to help improve relative scores
- The endpoint returns a JSON response with an array of scored suggested matches
    - The suggestions are sorted by descending score
    - Each suggestion has a score between 0 and 1 (inclusive) indicating confidence in the suggestion (1 is most confident)
    - Each suggestion has a name which can be used to disambiguate between similarly named locations
    - Each suggestion has a latitude and longitude


**Near match**

    GET /suggestions?q=Princ&latitude=43.70011&longitude=-79.4163

```json
{
  "suggestions": [
    {
      "name": "Prince",
      "latitude": "42.98339",
      "score": 0.9
    },
    {
      "name": "Prince Ville",
      "latitude": "39.88645",
      "score": 0.5
    },
    {
      "name": "Prince Rupert",
      "latitude": "37.12898",
      "score": 0.5
    },
    {
      "name": "PrinceVille",
      "latitude": "38.93345",
      "score": 0.3
    }
  ]
}
```

**No match**

    GET /suggestions?q=SomeRandomCityInTheMiddleOfNowhere

```json
{
  "suggestions": []
}
```
