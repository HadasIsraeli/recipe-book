import { useEffect, useState } from "react";


const useFetch = (url) => {

    const [data, setData] = useState(null);
    // const [recipes, setRecipe] = useState([
    //   { title: 'Chocolate Cake', body: 'something....', author: 'Hadas', id: 1 },
    //   { title: 'Cheese Cake', body: 'something....', author: 'Inbar', id: 2 },
    //   { title: 'Baklava', body: 'something....', author: 'Sarah', id: 3 }
    // ]);

    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);



    useEffect(() => {
        const abortControls = new AbortController();
        setTimeout(() => {
            fetch(url, { signal: abortControls.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('could not fetch data');
                    }
                    return res.json();
                }).then((data) => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                }).catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted');
                    } else {
                        setError(err.message);
                        setIsPending(false);
                    }
                });
        }, 1000);

        return () => abortControls.abort();
    }, [url]);

    return { data, isPending, error }
}

export default useFetch;