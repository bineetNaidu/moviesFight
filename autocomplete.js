const createAutoComplete = ({
    root,
    renderOption,
    onOptionSelect,
    inputValue,
    fetchData,
}) => {
    root.innerHTML = `
    <label><b>Search for Movies</b></label>
    <input class="input">
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

    const input = root.querySelector("input");
    const dropdown = root.querySelector(".dropdown");
    const resultsWrapper = root.querySelector(".results");

    const onInput = async (e) => {
        if (e.target.value !== "") {
            const moviesQueries = await fetchData(e.target.value);
            if (!moviesQueries.length) {
                dropdown.classList.remove("is-active");
                return;
            }
            resultsWrapper.innerHTML = "";
            dropdown.classList.add("is-active");
            for (let { Poster, Title, Type, Year, imdbID } of moviesQueries) {
                const option = document.createElement("a");
                option.classList.add("dropdown-item");
                option.innerHTML = renderOption(Poster, Title, Year);
                option.addEventListener("click", () => {
                    dropdown.classList.remove("is-active");
                    input.value = inputValue(Title);
                    onOptionSelect(imdbID);
                });
                resultsWrapper.appendChild(option);
            }
        }
    };

    input.addEventListener("input", debounce(onInput, 500));

    document.addEventListener("click", (e) => {
        if (!root.contains(e.target)) {
            dropdown.classList.remove("is-active");
        }
    });
};
