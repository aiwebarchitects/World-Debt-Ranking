 const countries = [
      { name: "United States of Debtmerica", debt: 31000000000000, flag: "https://flagcdn.com/w80/us.png" },
      { name: "Japan's Yen Yeet", debt: 13000000000000, flag: "https://flagcdn.com/w80/jp.png" },
      { name: "China's Great Wall of IOUs", debt: 9000000000000, flag: "https://flagcdn.com/w80/cn.png" },
      { name: "Italy's Pizza of Debt", debt: 2800000000000, flag: "https://flagcdn.com/w80/it.png" },
      { name: "France's Eiffel Tower of Loans", debt: 2700000000000, flag: "https://flagcdn.com/w80/fr.png" },
      { name: "Germany's Debt Wurst", debt: 2500000000000, flag: "https://flagcdn.com/w80/de.png" },
      { name: "UK's Royal Debt Collection", debt: 2400000000000, flag: "https://flagcdn.com/w80/gb.png" },
      { name: "India's Rupee Roulette", debt: 2300000000000, flag: "https://flagcdn.com/w80/in.png" },
      { name: "Brazil's Carnival of Creditors", debt: 1500000000000, flag: "https://flagcdn.com/w80/br.png" },
      { name: "Canada's Maple Syrup of Red Ink", debt: 1400000000000, flag: "https://flagcdn.com/w80/ca.png" }
    ];

    const icons = [
      '<svg class="icon" viewBox="0 0 24 24"><path fill="#e74c3c" d="M3 6h18v12H3V6zm9 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/></svg>',
      '<svg class="icon" viewBox="0 0 24 24"><path fill="#3498db" d="M4 4h16v16H4V4zm2 4h12v2H6V8zm0 4h12v2H6v-2zm0 4h8v2H6v-2z"/></svg>'
    ];

    function formatNumber(num) {
      return num.toLocaleString('en-US');
    }

    function updateRanking() {
      const $container = $('#ranking-container');
      $container.empty();

      countries.sort((a, b) => b.debt - a.debt);

      countries.forEach((country, index) => {
        const icon = icons[Math.floor(Math.random() * icons.length)];
        const $item = $('<div class="country-item">')
          .append(`<span class="country-rank">${index + 1}</span>`)
          .append(`<img class="flag" src="${country.flag}" alt="${country.name} flag">`)
          .append(icon)
          .append(`<span class="country-name">${country.name}</span>`)
          .append(`<span class="country-debt">$${formatNumber(country.debt)}</span>`);
        $container.append($item);
      });
    }

    function updateTotalDebt() {
      const totalDebt = countries.reduce((sum, country) => sum + country.debt, 0);
      $('#total-debt').text(formatNumber(totalDebt));
    }

    function simulateDebtChange() {
      countries.forEach(country => {
        const change = Math.random() * 100000000000 - 20000000000;
        country.debt = Math.max(0, country.debt + change);
      });
      updateRanking();
      updateTotalDebt();
      createMoneyRain();
    }

    function createMoneyRain() {
      const moneySymbols = ['💵', '💰', '💸', '🤑'];
      for (let i = 0; i < 5; i++) {
        const symbol = moneySymbols[Math.floor(Math.random() * moneySymbols.length)];
        const $money = $('<div class="money">').text(symbol);
        $money.css({
          left: `${Math.random() * 100}%`,
          animation: `moneyRain ${3 + Math.random() * 2}s linear`
        });
        $('body').append($money);
        setTimeout(() => $money.remove(), 5000);
      }
    }

    updateRanking();
    updateTotalDebt();
    setInterval(simulateDebtChange, 3000);

    let lastUpdate = Date.now();
    function updateRealTimeCounter() {
      const now = Date.now();
      const elapsed = (now - lastUpdate) / 1000;
      lastUpdate = now;

      countries.forEach(country => {
        country.debt += country.debt * 0.0000001 * elapsed;
      });
      updateTotalDebt();
    }

    setInterval(updateRealTimeCounter, 100);
