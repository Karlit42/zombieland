BEGIN;

SET CLIENT_ENCODING TO 'UTF-8';

TRUNCATE "attraction", "categorie", "utilisateur" CASCADE;

INSERT INTO categorie
    ("nom")

VALUES 
    ('Expérience immersive'),
    ('Restaurant'),
    ('Rollercoaster');

INSERT INTO utilisateur ("nom", "prenom", "email", "mot_de_passe", "admin")

VALUES
('Bonbeurre', 'Jean', 'jean.bonbeurre@gmail.com', 'motdepasse123', 'false'),
('Tartine', 'Marie', 'marie.tartine@gmail.com', 'motdepasse123', 'false'),
('Choco', 'Lait', 'lait.choco@gmail.com', 'motdepasse123', 'false'),
('Riz', 'Sotto', 'riz.sotto@gmail.com', 'motdepasse123', 'false'),
('Tomme', 'Harry', 'harry.tomme@gmail.com', 'motdepasse123', 'false'),
('Rose', 'Sel', 'sel.rose@gmail.com', 'motdepasse123', 'false'),
('Loup', 'Brick', 'brick.loup@gmail.com', 'motdepasse123', 'false'),
('Vert', 'Alain', 'alain.vert@gmail.com', 'motdepasse123', 'false'),
('Mer', 'Jade', 'jade.mer@gmail.com', 'motdepasse123', 'false'),
('Vin', 'Rouge', 'rouge.vin@gmail.com', 'motdepasse123', 'false'),
('Pierre', 'Feuille', 'feuille.pierre@gmail.com', 'motdepasse123', 'false'),
('Poivre', 'Sel', 'sel.poivre@gmail.com', 'motdepasse123', 'false');


INSERT INTO attraction
    ("nom", "slug", "description", "photo_url_1", "photo_url_2", "photo_url_3", "photo_url_4", "photo_url_5", "horaires", "categorie_id")

VALUES
    ('Dead Encounter',
    'dead-encounter',
    'Plongez dans l''horreur avec DEAD ENCOUNTER, une expérience cauchemardesque qui vous emmènera au plus profond de vos frayeurs. Cette maison d''horreur interdite aux moins de 18 ans vous mettra au défi de survivre à une série de scènes terrifiantes. Des monstres sanguinaires aux apparitions effrayantes, chaque coin cache une horreur inimaginable. Oserez-vous affronter vos pires cauchemars ?',
    'https://i.pinimg.com/736x/69/80/44/698044f25bc07a1e6f4457f42dc68562.jpg',
    'https://i.pinimg.com/736x/f4/bf/9c/f4bf9c59006ac13789ec672252f8cbd5.jpg',
    'https://i.pinimg.com/736x/bd/e0/d3/bde0d36eac87cd56c33998a5b8b941b2.jpg',
    'https://i.pinimg.com/736x/17/d9/3c/17d93c4980180e186bf9ddd1f1aea650.jpg',
    '',
    'de 10h à 21h',
    1),

    ('Feast of shadows',
    'feast-of-shadows',
    'Bienvenue à FEAST OF SHADOWS, le restaurant qui repousse les limites de la créativité culinaire. Vous serez plongé dans un univers sombre et mystérieux où les plats prennent vie sous une lumière tamisée. Notre menu propose une délicieuse sélection de mets horrifiques qui vous surprendront à chaque bouchée. Des plats étonnants, inspirés de l''univers macabre, vous attendent pour une expérience gastronomique inoubliable.',
    'https://i.pinimg.com/736x/7c/32/7e/7c327ea70ea6706f2547fce38ad9bcad.jpg',
    'https://i.pinimg.com/736x/60/db/f3/60dbf38b4cc75ac9582d2c58fb930eb9.jpg',
    'https://i.pinimg.com/736x/93/b3/a3/93b3a3028d20f10fc3d36a4eb329543b.jpg',
    'https://i.pinimg.com/736x/af/69/3e/af693e5ca6b4d77f151e76ce0d5a5add.jpg',
    '',
    'de 11h30 à 21h30',
    2),

    ('Undead Plunge',
    'undead-plunge',
    'Préparez-vous à vivre une aventure époustouflante avec UNDEAD PLUNGE. Ce rollercoaster extrême, doté de 20 loopings à couper le souffle, est conçu pour les amateurs de sensations fortes en quête d''adrénaline. Montez à bord de votre wagon et préparez-vous à être propulsé à travers des boucles spectaculaires, des vrilles effrayantes et des descentes à grande vitesse. UNDEAD PLUNGE vous promet une expérience de montagnes russes inoubliable que vous n''oserez pas oublier.',
    'https://i.pinimg.com/736x/2f/0e/5c/2f0e5c9dabfaa3de6b6e5fe3e15c8197.jpg',
    'https://i.pinimg.com/736x/bf/e3/eb/bfe3ebebbab2aab77bc36ede31012a10.jpg',
    'https://i.pinimg.com/736x/a9/9a/b2/a99ab26af4700ac4c61dcf5ef9faa292.jpg',
    'https://i.pinimg.com/736x/8c/8e/6d/8c8e6d448a53ae83cf1c86d705265903.jpg',
    '',
    'de 10h à 23h',
    3),

    ('Zombie parade',
    'zombie-parade',
    'Bienvenue dans ZOMBIE PARADE, une expérience immersive où le cauchemar devient réalité. Alors que vous explorez le parc, des hordes de zombies affamés font leur apparition et vous traquent. Votre survie dépendra de votre capacité à échapper aux morsures des morts-vivants. Plongez dans l''horreur avec cette aventure effrayante où l''adrénaline monte à chaque coin. Oserez-vous survivre à la ZOMBIE PARADE ?',
    'https://i.pinimg.com/736x/e0/cf/15/e0cf15237cc87b53c0f3eb252c4a9987.jpg',
    'https://i.pinimg.com/736x/ed/2c/48/ed2c48bd1a655c11ba19b099e79e8723.jpg',
    'https://i.pinimg.com/736x/db/a1/c2/dba1c2fae6fd67787ae25e3d03b91178.jpg',
    'https://i.pinimg.com/736x/14/52/68/145268f0bd31e76efa77cc0fb24d96a6.jpg',
    'https://i.pinimg.com/736x/18/9d/69/189d69eb9c726d866c5c504212487f78.jpg',
    'de 14h à 19h',
    1),

    ('Zombie thrill',
    'zombie-thrill',
    'Préparez-vous à une expérience de montagnes russes comme aucune autre avec ZOMBIE THRILL. Ce rollercoaster ultra rapide vous propulse à des vitesses vertigineuses atteignant 300 km/h. Vous ressentirez l''adrénaline monter en flèche tandis que vous survolez le parc à une vitesse fulgurante, enchaînant des virages serrés et des descentes à couper le souffle. ZOMBIE THRILL est conçu pour les amateurs de sensations fortes en quête d''une montée d''adrénaline inoubliable.',
    'https://i.pinimg.com/736x/f7/83/da/f783da8ea847769267b6198d35622964.jpg',
    'https://i.pinimg.com/736x/48/63/1a/48631a21433285d6ea5a0122a8b5fd16.jpg',
    'https://i.pinimg.com/736x/dc/7f/74/dc7f74ec9796cc6973a8120b45f66ed5.jpg',
    'https://i.pinimg.com/736x/3e/7b/49/3e7b49d435c4e0787c09987187f36a59.jpg',
    'https://i.pinimg.com/736x/d5/53/56/d5535608363f63d665b10863bcd0561c.jpg',
    'de 10h à 22h',
    3),

    ('Pink elegance bistro',
    'pink-elegance-bistro',
    'Bienvenue au PINK ELEGANCE BISTRO, un lieu où l''élégance rencontre la féminité dans une ambiance rose chatoyante. Notre restaurant girly friendly vous invite à plonger dans un monde de sophistication et de convivialité. Le décor rose, les détails élégants et une cuisine délicieuse créent une atmosphère chaleureuse et accueillante pour toutes les occasions. Que ce soit pour un déjeuner entre amies, un rendez-vous romantique ou une journée spéciale, PINK ELEGANCE BISTRO vous offre une expérience gastronomique exceptionnelle.',
    'https://i.pinimg.com/736x/4c/10/5c/4c105cbd295276cb99bc852fb5fda392.jpg',
    'https://i.pinimg.com/736x/48/7a/c8/487ac86edbbec1d2730f71d9211ac325.jpg',
    'https://i.pinimg.com/736x/c0/e9/ba/c0e9bacbf6dd48fa9b44998f483a4d6d.jpg',
    'https://i.pinimg.com/736x/7e/39/3a/7e393acd88516dd8fa5cb1d11f7bfeff.jpg',
    'https://i.pinimg.com/736x/a7/b5/d5/a7b5d5f0de998ffcd3509887726f7f89.jpg',
    'de 11h30 à 21h30',
    2);

COMMIT;



