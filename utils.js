const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

// let timeoutId;
// const onInput = (e) => {
//     if (timeoutId) {
//         clearInterval(timeoutId);
//     }
//     timeoutId = setTimeout(() => {
//         fetchData(e.target.value);
//     }, 1000);
// };
