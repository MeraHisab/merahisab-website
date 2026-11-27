document.addEventListener('DOMContentLoaded', () => {

    // Automatic Copyright Year

    document.querySelectorAll('[data-year]').forEach(e => {
        e.textContent = new Date().getFullYear();
    });

    // Royal Dark and Light Theme

    const t = document.querySelector('#theme');

    if (t) {

        try {
            document.documentElement.dataset.theme =
                localStorage.getItem('mh-theme') || 'dark';
        } catch {}

        t.onclick = () => {

            const v =
                document.documentElement.dataset.theme === 'light'
                    ? 'dark'
                    : 'light';

            document.documentElement.dataset.theme = v;

            try {
                localStorage.setItem('mh-theme', v);
            } catch {}

        };

    }

    // Financial Calculators

    const f = document.querySelector('#calc');

    if (f) {

        f.onsubmit = e => {

            e.preventDefault();

            const a = Number(f.amount.value);
            const r = Number(f.rate.value) / 100;
            const n = Number(f.years.value);
            const k = f.kind.value;

            let v =
                k === 'simple'
                    ? a * r * n
                    : k === 'compound'
                    ? a * ((1 + r) ** n - 1)
                    : k === 'emi'
                    ? (
                        r === 0
                            ? a / (n * 12)
                            : a * (r / 12) /
                              (1 - (1 + r / 12) ** (-n * 12))
                    )
                    : a * r;

            document.querySelector('#result').textContent =
                Number.isFinite(v)
                    ? new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR'
                    }).format(v)
                    : 'Invalid input';

        };

    }

});
