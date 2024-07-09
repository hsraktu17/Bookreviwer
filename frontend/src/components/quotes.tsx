
const quotes = [
    {
        quote: "When you find an idea that you just can’t stop thinking about, that’s probably a good one to pursue.",
        author: "Josh James",
        title: "Co-founder",
        company: "Omniture"
    },
    {
        quote: "My biggest motivation? Just to keep challenging myself. I see life almost like one long University education that I never had – every day I’m learning something new.",
        author: "Richard Branson",
        title: "Co-founder",
        company: "Virgin Group"
    },
    {
        quote: "Every time you state what you want or believe, you’re the first to hear it. It’s a message to both you and others about what you think is possible. Don’t put a ceiling on yourself.",
        author: "Oprah Winfrey",
        title: "Global Media Leader",
        company: "Producer, and Actress"
    },
    {
        quote: "I got lucky because I never gave up the search. Are you quitting too soon? Or are you willing to pursue luck with a vengeance, too?",
        author: "Jill Konrath",
        title: "Sales Strategist",
        company: "Speaker, and Author"
    },
    {
        quote: "I knew that if I failed I wouldn’t regret that, but I knew the one thing I might regret is not trying.",
        author: "Jeff Bezos",
        title: "Founder",
        company: "Amazon"
    }
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

const Quote = () => {
    const randomQuote = getRandomQuote();

    return (
        <div className="flex justify-center items-center h-screen bg-slate-300 p-4">
            <div className="max-w-lg p-8 rounded-lg">
                <div className="font-bold text-3xl py-4 text-center">
                    &quot;{randomQuote.quote}&quot;
                </div>
                <div className="font-semibold text-xl text-center">
                    {randomQuote.author}
                </div>
                <div className="text-md text-center">
                    {randomQuote.title} | {randomQuote.company}
                </div>
            </div>
        </div>
    );
};

export default Quote;