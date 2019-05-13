## usCounties.json
Go to https://en.wikipedia.org/wiki/List_of_United_States_counties_and_county_equivalents. Run the following code.
```js
Array.from(document.querySelectorAll('table')[0].querySelectorAll('tr')).map(v => {
    let id = v.querySelectorAll('td:nth-child(1)');
    let name = v.querySelectorAll('td:nth-child(2)');
    let state = v.querySelectorAll('td:nth-child(3)');

    id = id[0] ? id[0].innerText : null;
    name = name[0] ? name[0].innerText : null;
    state = state[0] ? state[0].innerText : null;
    return {name, state, id};
});
```
Then remove the first empty entry. Finally remove all "County" suffixes.
