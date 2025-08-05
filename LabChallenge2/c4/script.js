document.addEventListener('DOMContentLoaded', () => {
    const periodicTable = document.getElementById('periodic-table');
    const detailsPanel = document.getElementById('element-details-panel');
    const detailsContent = document.getElementById('details-content');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay');

    const elementsData = [
        ['Hydrogen', 'H', 1, 'reactive-nonmetal', '1.008', '1s¹', [1, 1]],
        ['Helium', 'He', 2, 'noble-gas', '4.0026', '1s²', [1, 18]],
        ['Lithium', 'Li', 3, 'alkali-metal', '6.94', '[He] 2s¹', [2, 1]],
        ['Beryllium', 'Be', 4, 'alkaline-earth-metal', '9.0122', '[He] 2s²', [2, 2]],
        ['Boron', 'B', 5, 'metalloid', '10.81', '[He] 2s² 2p¹', [2, 13]],
        ['Carbon', 'C', 6, 'reactive-nonmetal', '12.011', '[He] 2s² 2p²', [2, 14]],
        ['Nitrogen', 'N', 7, 'reactive-nonmetal', '14.007', '[He] 2s² 2p³', [2, 15]],
        ['Oxygen', 'O', 8, 'reactive-nonmetal', '15.999', '[He] 2s² 2p⁴', [2, 16]],
        ['Fluorine', 'F', 9, 'reactive-nonmetal', '18.998', '[He] 2s² 2p⁵', [2, 17]],
        ['Neon', 'Ne', 10, 'noble-gas', '20.180', '[He] 2s² 2p⁶', [2, 18]],
        ['Sodium', 'Na', 11, 'alkali-metal', '22.990', '[Ne] 3s¹', [3, 1]],
        ['Magnesium', 'Mg', 12, 'alkaline-earth-metal', '24.305', '[Ne] 3s²', [3, 2]],
        ['Aluminium', 'Al', 13, 'post-transition-metal', '26.982', '[Ne] 3s² 3p¹', [3, 13]],
        ['Silicon', 'Si', 14, 'metalloid', '28.085', '[Ne] 3s² 3p²', [3, 14]],
        ['Phosphorus', 'P', 15, 'reactive-nonmetal', '30.974', '[Ne] 3s² 3p³', [3, 15]],
        ['Sulfur', 'S', 16, 'reactive-nonmetal', '32.06', '[Ne] 3s² 3p⁴', [3, 16]],
        ['Chlorine', 'Cl', 17, 'reactive-nonmetal', '35.45', '[Ne] 3s² 3p⁵', [3, 17]],
        ['Argon', 'Ar', 18, 'noble-gas', '39.948', '[Ne] 3s² 3p⁶', [3, 18]],
        ['Potassium', 'K', 19, 'alkali-metal', '39.098', '[Ar] 4s¹', [4, 1]],
        ['Calcium', 'Ca', 20, 'alkaline-earth-metal', '40.078', '[Ar] 4s²', [4, 2]],
        ['Scandium', 'Sc', 21, 'transition-metal', '44.956', '[Ar] 3d¹ 4s²', [4, 3]],
        ['Titanium', 'Ti', 22, 'transition-metal', '47.867', '[Ar] 3d² 4s²', [4, 4]],
        ['Vanadium', 'V', 23, 'transition-metal', '50.942', '[Ar] 3d³ 4s²', [4, 5]],
        ['Chromium', 'Cr', 24, 'transition-metal', '51.996', '[Ar] 3d⁵ 4s¹', [4, 6]],
        ['Manganese', 'Mn', 25, 'transition-metal', '54.938', '[Ar] 3d⁵ 4s²', [4, 7]],
        ['Iron', 'Fe', 26, 'transition-metal', '55.845', '[Ar] 3d⁶ 4s²', [4, 8]],
        ['Cobalt', 'Co', 27, 'transition-metal', '58.933', '[Ar] 3d⁷ 4s²', [4, 9]],
        ['Nickel', 'Ni', 28, 'transition-metal', '58.693', '[Ar] 3d⁸ 4s²', [4, 10]],
        ['Copper', 'Cu', 29, 'transition-metal', '63.546', '[Ar] 3d¹⁰ 4s¹', [4, 11]],
        ['Zinc', 'Zn', 30, 'transition-metal', '65.38', '[Ar] 3d¹⁰ 4s²', [4, 12]],
        ['Gallium', 'Ga', 31, 'post-transition-metal', '69.723', '[Ar] 3d¹⁰ 4s² 4p¹', [4, 13]],
        ['Germanium', 'Ge', 32, 'metalloid', '72.630', '[Ar] 3d¹⁰ 4s² 4p²', [4, 14]],
        ['Arsenic', 'As', 33, 'metalloid', '74.922', '[Ar] 3d¹⁰ 4s² 4p³', [4, 15]],
        ['Selenium', 'Se', 34, 'reactive-nonmetal', '78.971', '[Ar] 3d¹⁰ 4s² 4p⁴', [4, 16]],
        ['Bromine', 'Br', 35, 'reactive-nonmetal', '79.904', '[Ar] 3d¹⁰ 4s² 4p⁵', [4, 17]],
        ['Krypton', 'Kr', 36, 'noble-gas', '83.798', '[Ar] 3d¹⁰ 4s² 4p⁶', [4, 18]],
        ['Rubidium', 'Rb', 37, 'alkali-metal', '85.468', '[Kr] 5s¹', [5, 1]],
        ['Strontium', 'Sr', 38, 'alkaline-earth-metal', '87.62', '[Kr] 5s²', [5, 2]],
        ['Yttrium', 'Y', 39, 'transition-metal', '88.906', '[Kr] 4d¹ 5s²', [5, 3]],
        ['Zirconium', 'Zr', 40, 'transition-metal', '91.224', '[Kr] 4d² 5s²', [5, 4]],
        ['Niobium', 'Nb', 41, 'transition-metal', '92.906', '[Kr] 4d⁴ 5s¹', [5, 5]],
        ['Molybdenum', 'Mo', 42, 'transition-metal', '95.96', '[Kr] 4d⁵ 5s¹', [5, 6]],
        ['Technetium', 'Tc', 43, 'transition-metal', '(98)', '[Kr] 4d⁵ 5s²', [5, 7]],
        ['Ruthenium', 'Ru', 44, 'transition-metal', '101.07', '[Kr] 4d⁷ 5s¹', [5, 8]],
        ['Rhodium', 'Rh', 45, 'transition-metal', '102.91', '[Kr] 4d⁸ 5s¹', [5, 9]],
        ['Palladium', 'Pd', 46, 'transition-metal', '106.42', '[Kr] 4d¹⁰', [5, 10]],
        ['Silver', 'Ag', 47, 'transition-metal', '107.87', '[Kr] 4d¹⁰ 5s¹', [5, 11]],
        ['Cadmium', 'Cd', 48, 'transition-metal', '112.41', '[Kr] 4d¹⁰ 5s²', [5, 12]],
        ['Indium', 'In', 49, 'post-transition-metal', '114.82', '[Kr] 4d¹⁰ 5s² 5p¹', [5, 13]],
        ['Tin', 'Sn', 50, 'post-transition-metal', '118.71', '[Kr] 4d¹⁰ 5s² 5p²', [5, 14]],
        ['Antimony', 'Sb', 51, 'metalloid', '121.76', '[Kr] 4d¹⁰ 5s² 5p³', [5, 15]],
        ['Tellurium', 'Te', 52, 'metalloid', '127.60', '[Kr] 4d¹⁰ 5s² 5p⁴', [5, 16]],
        ['Iodine', 'I', 53, 'reactive-nonmetal', '126.90', '[Kr] 4d¹⁰ 5s² 5p⁵', [5, 17]],
        ['Xenon', 'Xe', 54, 'noble-gas', '131.29', '[Kr] 4d¹⁰ 5s² 5p⁶', [5, 18]],
        ['Caesium', 'Cs', 55, 'alkali-metal', '132.91', '[Xe] 6s¹', [6, 1]],
        ['Barium', 'Ba', 56, 'alkaline-earth-metal', '137.33', '[Xe] 6s²', [6, 2]],
        ['Lanthanum', 'La', 57, 'lanthanide', '138.91', '[Xe] 5d¹ 6s²', [9, 3]],
        ['Lanthanum', 'La', 57, 'lanthanide', '138.91', '[Xe] 5d¹ 6s²', [6, 3]],
        ['Cerium', 'Ce', 58, 'lanthanide', '140.12', '[Xe] 4f¹ 5d¹ 6s²', [9, 4]],
        ['Praseodymium', 'Pr', 59, 'lanthanide', '140.91', '[Xe] 4f³ 6s²', [9, 5]],
        ['Neodymium', 'Nd', 60, 'lanthanide', '144.24', '[Xe] 4f⁴ 6s²', [9, 6]],
        ['Promethium', 'Pm', 61, 'lanthanide', '(145)', '[Xe] 4f⁵ 6s²', [9, 7]],
        ['Samarium', 'Sm', 62, 'lanthanide', '150.36', '[Xe] 4f⁶ 6s²', [9, 8]],
        ['Europium', 'Eu', 63, 'lanthanide', '151.96', '[Xe] 4f⁷ 6s²', [9, 9]],
        ['Gadolinium', 'Gd', 64, 'lanthanide', '157.25', '[Xe] 4f⁷ 5d¹ 6s²', [9, 10]],
        ['Terbium', 'Tb', 65, 'lanthanide', '158.93', '[Xe] 4f⁹ 6s²', [9, 11]],
        ['Dysprosium', 'Dy', 66, 'lanthanide', '162.50', '[Xe] 4f¹⁰ 6s²', [9, 12]],
        ['Holmium', 'Ho', 67, 'lanthanide', '164.93', '[Xe] 4f¹¹ 6s²', [9, 13]],
        ['Erbium', 'Er', 68, 'lanthanide', '167.26', '[Xe] 4f¹² 6s²', [9, 14]],
        ['Thulium', 'Tm', 69, 'lanthanide', '168.93', '[Xe] 4f¹³ 6s²', [9, 15]],
        ['Ytterbium', 'Yb', 70, 'lanthanide', '173.05', '[Xe] 4f¹⁴ 6s²', [9, 16]],
        ['Lutetium', 'Lu', 71, 'lanthanide', '174.97', '[Xe] 4f¹⁴ 5d¹ 6s²', [9, 17]],
        ['Hafnium', 'Hf', 72, 'transition-metal', '178.49', '[Xe] 4f¹⁴ 5d² 6s²', [6, 4]],
        ['Tantalum', 'Ta', 73, 'transition-metal', '180.95', '[Xe] 4f¹⁴ 5d³ 6s²', [6, 5]],
        ['Tungsten', 'W', 74, 'transition-metal', '183.84', '[Xe] 4f¹⁴ 5d⁴ 6s²', [6, 6]],
        ['Rhenium', 'Re', 75, 'transition-metal', '186.21', '[Xe] 4f¹⁴ 5d⁵ 6s²', [6, 7]],
        ['Osmium', 'Os', 76, 'transition-metal', '190.23', '[Xe] 4f¹⁴ 5d⁶ 6s²', [6, 8]],
        ['Iridium', 'Ir', 77, 'transition-metal', '192.22', '[Xe] 4f¹⁴ 5d⁷ 6s²', [6, 9]],
        ['Platinum', 'Pt', 78, 'transition-metal', '195.08', '[Xe] 4f¹⁴ 5d⁹ 6s¹', [6, 10]],
        ['Gold', 'Au', 79, 'transition-metal', '196.97', '[Xe] 4f¹⁴ 5d¹⁰ 6s¹', [6, 11]],
        ['Mercury', 'Hg', 80, 'transition-metal', '200.59', '[Xe] 4f¹⁴ 5d¹⁰ 6s²', [6, 12]],
        ['Thallium', 'Tl', 81, 'post-transition-metal', '204.38', '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p¹', [6, 13]],
        ['Lead', 'Pb', 82, 'post-transition-metal', '207.2', '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p²', [6, 14]],
        ['Bismuth', 'Bi', 83, 'post-transition-metal', '208.98', '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p³', [6, 15]],
        ['Polonium', 'Po', 84, 'post-transition-metal', '(209)', '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁴', [6, 16]],
        ['Astatine', 'At', 85, 'metalloid', '(210)', '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁵', [6, 17]],
        ['Radon', 'Rn', 86, 'noble-gas', '(222)', '[Xe] 4f¹⁴ 5d¹⁰ 6s² 6p⁶', [6, 18]],
        ['Francium', 'Fr', 87, 'alkali-metal', '(223)', '[Rn] 7s¹', [7, 1]],
        ['Radium', 'Ra', 88, 'alkaline-earth-metal', '(226)', '[Rn] 7s²', [7, 2]],
        ['Actinium', 'Ac', 89, 'actinide', '(227)', '[Rn] 6d¹ 7s²', [7, 3]],
        ['Actinium', 'Ac', 89, 'actinide', '(227)', '[Rn] 6d¹ 7s²', [10, 3]],
        ['Thorium', 'Th', 90, 'actinide', '232.04', '[Rn] 6d² 7s²', [10, 4]],
        ['Protactinium', 'Pa', 91, 'actinide', '231.04', '[Rn] 5f² 6d¹ 7s²', [10, 5]],
        ['Uranium', 'U', 92, 'actinide', '238.03', '[Rn] 5f³ 6d¹ 7s²', [10, 6]],
        ['Neptunium', 'Np', 93, 'actinide', '(237)', '[Rn] 5f⁴ 6d¹ 7s²', [10, 7]],
        ['Plutonium', 'Pu', 94, 'actinide', '(244)', '[Rn] 5f⁶ 7s²', [10, 8]],
        ['Americium', 'Am', 95, 'actinide', '(243)', '[Rn] 5f⁷ 7s²', [10, 9]],
        ['Curium', 'Cm', 96, 'actinide', '(247)', '[Rn] 5f⁷ 6d¹ 7s²', [10, 10]],
        ['Berkelium', 'Bk', 97, 'actinide', '(247)', '[Rn] 5f⁹ 7s²', [10, 11]],
        ['Californium', 'Cf', 98, 'actinide', '(251)', '[Rn] 5f¹⁰ 7s²', [10, 12]],
        ['Einsteinium', 'Es', 99, 'actinide', '(252)', '[Rn] 5f¹¹ 7s²', [10, 13]],
        ['Fermium', 'Fm', 100, 'actinide', '(257)', '[Rn] 5f¹² 7s²', [10, 14]],
        ['Mendelevium', 'Md', 101, 'actinide', '(258)', '[Rn] 5f¹³ 7s²', [10, 15]],
        ['Nobelium', 'No', 102, 'actinide', '(259)', '[Rn] 5f¹⁴ 7s²', [10, 16]],
        ['Lawrencium', 'Lr', 103, 'actinide', '(262)', '[Rn] 5f¹⁴ 7s² 7p¹', [10, 17]],
        ['Rutherfordium', 'Rf', 104, 'transition-metal', '(267)', '[Rn] 5f¹⁴ 6d² 7s²', [7, 4]],
        ['Dubnium', 'Db', 105, 'transition-metal', '(268)', '[Rn] 5f¹⁴ 6d³ 7s²', [7, 5]],
        ['Seaborgium', 'Sg', 106, 'transition-metal', '(271)', '[Rn] 5f¹⁴ 6d⁴ 7s²', [7, 6]],
        ['Bohrium', 'Bh', 107, 'transition-metal', '(272)', '[Rn] 5f¹⁴ 6d⁵ 7s²', [7, 7]],
        ['Hassium', 'Hs', 108, 'transition-metal', '(277)', '[Rn] 5f¹⁴ 6d⁶ 7s²', [7, 8]],
        ['Meitnerium', 'Mt', 109, 'unknown', '(276)', '[Rn] 5f¹⁴ 6d⁷ 7s²', [7, 9]],
        ['Darmstadtium', 'Ds', 110, 'unknown', '(281)', '[Rn] 5f¹⁴ 6d⁸ 7s²', [7, 10]],
        ['Roentgenium', 'Rg', 111, 'unknown', '(280)', '[Rn] 5f¹⁴ 6d⁹ 7s²', [7, 11]],
        ['Copernicium', 'Cn', 112, 'transition-metal', '(285)', '[Rn] 5f¹⁴ 6d¹⁰ 7s²', [7, 12]],
        ['Nihonium', 'Nh', 113, 'unknown', '(286)', '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p¹', [7, 13]],
        ['Flerovium', 'Fl', 114, 'post-transition-metal', '(289)', '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p²', [7, 14]],
        ['Moscovium', 'Mc', 115, 'unknown', '(290)', '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p³', [7, 15]],
        ['Livermorium', 'Lv', 116, 'unknown', '(293)', '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁴', [7, 16]],
        ['Tennessine', 'Ts', 117, 'unknown', '(294)', '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁵', [7, 17]],
        ['Oganesson', 'Og', 118, 'unknown', '(294)', '[Rn] 5f¹⁴ 6d¹⁰ 7s² 7p⁶', [7, 18]],
    ];

    elementsData.forEach(el => {
        const [name, symbol, number, category, mass, config, [row, col]] = el;

        const elementCell = document.createElement('div');
        elementCell.className = `element ${category}`;
        elementCell.style.gridRow = row;
        elementCell.style.gridColumn = col;

        elementCell.dataset.name = name;
        elementCell.dataset.symbol = symbol;
        elementCell.dataset.number = number;
        elementCell.dataset.category = category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
        elementCell.dataset.mass = mass;
        elementCell.dataset.config = config;

        elementCell.innerHTML = `
            <div class="number">${number}</div>
            <div class="symbol">${symbol}</div>
            <div class="name">${name}</div>
        `;

        elementCell.addEventListener('click', () => showDetails(elementCell));
        periodicTable.appendChild(elementCell);
    });

    function showDetails(element) {
        const { name, symbol, number, category, mass, config } = element.dataset;
        detailsContent.innerHTML = `
            <h2>${name} (${symbol})</h2>
            <p><strong>Atomic Number:</strong> ${number}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Atomic Mass:</strong> ${mass}</p>
            <p><strong>Electron Configuration:</strong> ${config}</p>
        `;
        detailsPanel.classList.remove('hidden');
        overlay.classList.remove('hidden');
    }

    function hideDetails() {
        detailsPanel.classList.add('hidden');
        overlay.classList.add('hidden');
    }


    closeBtn.addEventListener('click', hideDetails);
    overlay.addEventListener('click', hideDetails);
});