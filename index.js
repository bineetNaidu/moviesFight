const autoCompleteConfig = {
    renderOption(Poster, Title, Year) {
        const imgScr = Poster === "N/A" ? "" : Poster;
        return `<img src='${imgScr}' />${Title} (${Year})`;
    },
    inputValue(Title) {
        return Title;
    },

    async fetchData(searchQuery) {
        const response = await axios.get("http://www.omdbapi.com/", {
            params: {
                apiKey: __Your_API_KEY__,
                s: searchQuery,
                plot: true,
            },
        });
        if (response.data.Error) return [];
        return response.data.Search;
    },
};

createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector("#left-autocomplete"),
    onOptionSelect(imdbID) {
        document.querySelector(".tutorial").classList.add("is-hidden");
        onMovieSelect(imdbID, document.querySelector("#left-summary"), "left");
    },
});
createAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector("#right-autocomplete"),
    onOptionSelect(imdbID) {
        document.querySelector(".tutorial").classList.add("is-hidden");
        onMovieSelect(
            imdbID,
            document.querySelector("#right-summary"),
            "right"
        );
    },
});

let leftMovie;
let rightMovie;

const onMovieSelect = async (imdbID, summaryElement, side) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apiKey: __Your_API_KEY__,
            i: imdbID,
            plot: true,
        },
    });
    summaryElement.innerHTML = movieTemplate(response.data);
    side.toLowerCase() === "left"
        ? (leftMovie = response.data)
        : (rightMovie = response.data);

    if (leftMovie && rightMovie) {
        runComparision();
    }
};

const runComparision = () => {
    const leftSidestats = document.querySelectorAll(
        "#left-summary .notification"
    );
    const rightSidestats = document.querySelectorAll(
        "#right-summary .notification"
    );

    leftSidestats.forEach((leftStat, i) => {
        const rightStat = rightSidestats[i];

        const leftSideValue = parseInt(leftStat.dataset.value);
        const rightSideValue = parseInt(rightStat.dataset.value);

        if (rightSideValue > leftSideValue) {
            leftStat.classList.remove("is-primary");
            leftStat.classList.add("is-warning");
        } else {
            rightStat.classList.remove("is-primary");
            rightStat.classList.add("is-warning");
        }
    });
};

const movieTemplate = ({
    Poster,
    Title,
    Genre,
    Plot,
    Awards,
    BoxOffice,
    Metascore,
    imdbRating,
    imdbVotes,
}) => {
    BoxOffice ? BoxOffice : (BoxOffice = "N/A");
    const dollar = parseInt(BoxOffice.replace(/\$/g, "").replace(/,/g, ""));
    const metascore = parseInt(Metascore);
    const imdbrating = parseFloat(imdbRating);
    const imbdvotes = parseInt(imdbVotes.replace(/,/g, ""));
    const award = Awards.split(" ").reduce((prev, word) => {
        const value = parseInt(word);
        if (isNaN(value)) {
            return prev;
        }
        return prev + value;
    }, 0);

    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${Poster}"/> 
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${Title}</h1>
                <h4>${Genre}</h4>
                <p>${Plot}</p>
            </div>
        </div>
    </article>
    <article data-value=${award} class="notification is-primary">
    <p class="title">${Awards}</p>
    <p class="subtitle">Awards</p>
    </article>
    <article data-value=${dollar} class="notification is-primary">
        <p class="title">${BoxOffice}</p>
        <p class="subtitle">BoxOffice</p>
    </article>
    <article data-value=${metascore} class="notification is-primary">
        <p class="title">${Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbrating} class="notification is-primary">
        <p class="title">${imdbRating}</p>
        <p class="subtitle">imdbRating</p>
    </article>
    <article data-value=${imbdvotes} class="notification is-primary">
        <p class="title">${imdbVotes}</p>
        <p class="subtitle">imdbVotes</p>
    </article>
`;
};
