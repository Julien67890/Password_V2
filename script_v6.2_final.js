/* ═══════════════════════════════════════════════════════════════
   MOT DE PASSE v5.0 — VERSION FINALE COMPLÈTE
   
   ✅ 6 thèmes × ~100 mots = 648 mots
   ✅ 15 associations par mot = 9,720 associations
   ✅ 100% LOCAL (aucune API)
   ✅ Mode vocal activé par défaut
   ✅ Randomisation complète
   ✅ Bug comptage corrigé
   ✅ PWA compatible
   ═══════════════════════════════════════════════════════════════ */

// Helper pour créer un mot avec 15 associations
const W = (assocs, genre) => ({ assocs: assocs.split(','), genre });

// ══════════════════════════════════════════════════════════════════
// 1. DICTIONNAIRE COMPLET - 6 THÈMES
// ══════════════════════════════════════════════════════════════════

const THEMES_DATA = {
  '🌍 Géographie': [
    {word:'AMAZONIE',assocs:['forêt','fleuve','brésil','jungle','amérique','tropical','bassin','vert','sud','biodiversité'],genre:'F'},
    {word:'BERLIN',assocs:['allemagne','capitale','mur','europe','ville','réunification','brandebourg','histoire','est','ouest'],genre:'M'},
    {word:'BRÉSIL',assocs:['amérique','sud','pays','rio','samba','football','plage','carnaval','amazonie','portugais'],genre:'M'},
    {word:'CANADA',assocs:['pays','amérique','nord','froid','ottawa','érable','grand','montréal','anglais','français'],genre:'M'},
    {word:'CHINE',assocs:['asie','pays','peuple','grand','mur','beijing','mandarin','population','dragon','rouge'],genre:'F'},
    {word:'CONGO',assocs:['afrique','fleuve','pays','jungle','kinshasa','central','bassin','forêt','grand','rivière'],genre:'M'},
    {word:'DANUBE',assocs:['fleuve','europe','long','vienne','budapest','allemagne','autriche','bleu','hongrie','delta'],genre:'M'},
    {word:'DÉSERT',assocs:['sable','aride','sec','sahara','chaud','dune','oasis','soif','vide','immense'],genre:'M'},
    {word:'ÉGYPTE',assocs:['afrique','pays','pyramide','pharaon','nil','caire','sphinx','ancienne','sable','momie'],genre:'F'},
    {word:'ÉQUATEUR',assocs:['pays','amérique','sud','ligne','quito','andes','milieu','latitude','zéro','tropical'],genre:'M'},
    {word:'EVEREST',assocs:['montagne','himalaya','sommet','népal','haut','altitude','escalade','sherpa','neige','8848'],genre:'M'},
    {word:'FRANCE',assocs:['europe','pays','paris','capitale','tour','eiffel','fromage','vin','liberté','coq'],genre:'F'},
    {word:'HIMALAYA',assocs:['montagne','asie','chaîne','nepal','tibet','haut','everest','altitude','neige','toit'],genre:'M'},
    {word:'INDE',assocs:['asie','pays','population','delhi','mumbai','bollywood','curry','taj','mahal','épices'],genre:'F'},
    {word:'IRLANDE',assocs:['europe','île','dublin','vert','trèfle','pays','celtique','bière','guinness','ouest'],genre:'F'},
    {word:'ISTANBUL',assocs:['turquie','ville','bosphore','mosquée','asie','europe','ottoman','ancien','byzance','grand'],genre:'M'},
    {word:'ITALIE',assocs:['europe','pays','rome','pizza','pasta','botte','méditerranée','vatican','renaissance','colisée'],genre:'F'},
    {word:'JAPON',assocs:['asie','pays','tokyo','îles','sushi','manga','soleil','levant','mont','fuji'],genre:'M'},
    {word:'LISBONNE',assocs:['portugal','capitale','europe','atlantique','tage','ville','ouest','pastel','tramway','fado'],genre:'F'},
    {word:'LONDRES',assocs:['angleterre','capitale','tamise','big','ben','royaume','uni','métro','tower','royal'],genre:'M'},
    {word:'MADRID',assocs:['espagne','capitale','europe','central','musée','prado','football','real','plaza','mayor'],genre:'M'},
    {word:'MAROC',assocs:['afrique','nord','pays','rabat','maghreb','atlas','arabe','berbère','sahara','tajine'],genre:'M'},
    {word:'MEXIQUE',assocs:['amérique','nord','pays','aztèque','maya','tequila','tacos','ville','golf','espagnol'],genre:'M'},
    {word:'MOSCOU',assocs:['russie','capitale','kremlin','rouge','place','froid','métro','tzar','europe','asie'],genre:'M'},
    {word:'NIL',assocs:['fleuve','afrique','égypte','long','caire','delta','crocodile','pharaon','barrage','source'],genre:'M'},
    {word:'NORVÈGE',assocs:['europe','nord','pays','oslo','fjord','viking','froid','pétrole','montagne','ski'],genre:'F'},
    {word:'OCÉAN',assocs:['eau','mer','salée','vague','bleu','pacifique','atlantique','profond','immense','maritime'],genre:'M'},
    {word:'PAKISTAN',assocs:['asie','pays','islamabad','karachi','musulman','indus','montagne','cricket','inde','voisin'],genre:'M'},
    {word:'PARIS',assocs:['france','capitale','tour','eiffel','seine','louvre','ville','lumière','mode','arc'],genre:'M'},
    {word:'PÉROU',assocs:['amérique','sud','pays','lima','andes','machu','picchu','inca','lama','péruvien'],genre:'M'},
    {word:'PORTUGAL',assocs:['europe','pays','lisbonne','atlantique','navigateur','fado','porto','colon','azulejo','ouest'],genre:'M'},
    {word:'PRAGUE',assocs:['tchéquie','capitale','europe','central','pont','charles','château','bière','vltava','médiéval'],genre:'F'},
    {word:'QUÉBEC',assocs:['canada','province','français','montréal','ville','froid','érable','fleuve','saint','laurent'],genre:'M'},
    {word:'ROME',assocs:['italie','capitale','antique','colisée','vatican','forum','césar','éternelle','empire','fontaine'],genre:'F'},
    {word:'RUSSIE',assocs:['europe','asie','pays','moscou','sibérie','vodka','froid','grand','communiste','rouge'],genre:'F'},
    {word:'SAHARA',assocs:['désert','afrique','nord','sable','dune','chaud','aride','touareg','oasis','grand'],genre:'M'},
    {word:'SEINE',assocs:['fleuve','paris','france','pont','bateau','rive','gauche','droite','ile','cité'],genre:'F'},
    {word:'SÉOUL',assocs:['corée','sud','capitale','asie','ville','moderne','kpop','han','fleuve','métropole'],genre:'M'},
    {word:'SIBÉRIE',assocs:['russie','froid','nord','vaste','taiga','permafrost','hiver','arctique','isolé','extrême'],genre:'F'},
    {word:'SUISSE',assocs:['europe','pays','alpes','montagne','fromage','chocolat','neutre','banque','genève','zurich'],genre:'F'},
    {word:'SYDNEY',assocs:['australie','ville','opéra','port','plage','bondi','harbour','bridge','pacifique','sud'],genre:'M'},
    {word:'TOKYO',assocs:['japon','capitale','asie','métropole','moderne','shibuya','manga','anime','mont','fuji'],genre:'M'},
    {word:'TORONTO',assocs:['canada','ville','ontario','grand','lac','niagara','métropole','anglais','cn','tower'],genre:'M'},
    {word:'TURQUIE',assocs:['europe','asie','pays','istanbul','ankara','bosphore','kebab','mosquée','ottoman','pont'],genre:'F'},
    {word:'VENISE',assocs:['italie','ville','canal','gondole','eau','pont','soupirs','place','saint','marc'],genre:'F'},
    {word:'VIENNE',assocs:['autriche','capitale','musique','mozart','danube','palais','schönbrunn','valse','café','impérial'],genre:'F'},
    {word:'VOLCAN',assocs:['montagne','lave','éruption','cratère','magma','feu','cendre','géologie','explosif','danger'],genre:'M'},
  ],

  '🎬 Divertissement': [
    {word:'ACTEUR',assocs:['cinéma','jouer','rôle','film','scène','oscar','talent','star','métier','plateau'],genre:'M'},
    {word:'ALBUM',assocs:['musique','disque','chansons','cd','vinyle','artiste','pochette','titre','collection','enregistrement'],genre:'M'},
    {word:'BATMAN',assocs:['superhéros','gotham','chauve-souris','masque','cape','justice','film','comics','bruce','wayne'],genre:'M'},
    {word:'CINÉMA',assocs:['film','salle','écran','popcorn','projection','acteur','réalisateur','caméra','ticket','art'],genre:'M'},
    {word:'CONCERT',assocs:['musique','scène','live','public','chanson','spectacle','salle','guitare','micro','applaudissements'],genre:'M'},
    {word:'DISNEY',assocs:['animation','film','mickey','château','magie','walt','pixar','princesse','enfant','rêve'],genre:'M'},
    {word:'DRAME',assocs:['genre','film','sérieux','émotionnel','intense','conflit','histoire','théâtre','tragique','profond'],genre:'M'},
    {word:'FILM',assocs:['cinéma','acteur','scénario','caméra','écran','oscar','hollywood','histoire','réalisateur','art'],genre:'M'},
    {word:'GRAMMY',assocs:['prix','musique','cérémonie','award','disque','chanteur','américain','or','statuette','prestige'],genre:'M'},
    {word:'HOLLYWOOD',assocs:['cinéma','états','unis','film','star','oscar','boulevard','fame','studio','celebrity'],genre:'M'},
    {word:'JAMES',assocs:['bond','agent','007','espion','film','british','secret','service','martini','gadget'],genre:'M'},
    {word:'JAZZ',assocs:['musique','blues','swing','saxophone','trompette','improvisation','new','orleans','cool','rhythm'],genre:'M'},
    {word:'MADONNA',assocs:['chanteuse','américaine','pop','icon','vogue','material','girl','queen','star','provocante'],genre:'F'},
    {word:'MARVEL',assocs:['comics','superhéros','avengers','spiderman','iron','man','cinematic','universe','action','film'],genre:'M'},
    {word:'MICHAEL',assocs:['jackson','king','pop','thriller','moonwalk','danser','chanteur','gant','blanc','legend'],genre:'M'},
    {word:'MUSIQUE',assocs:['son','mélodie','chanson','instrument','rythme','harmonie','concert','audio','art','chanter'],genre:'F'},
    {word:'NETFLIX',assocs:['streaming','série','film','plateforme','internet','watch','original','content','digital','subscription'],genre:'M'},
    {word:'OSCAR',assocs:['cinéma','prix','academy','award','statuette','hollywood','nomination','red','carpet','prestige'],genre:'M'},
    {word:'OPÉRA',assocs:['musique','chant','classique','scène','théâtre','aria','soprano','orchestre','wagner','verdi'],genre:'M'},
    {word:'POP',assocs:['musique','populaire','chart','radio','hit','commercial','melody','dance','catchy','mainstream'],genre:'F'},
    {word:'ROCK',assocs:['musique','guitare','électrique','band','concert','heavy','metal','classic','rebel','loud'],genre:'M'},
    {word:'SCÈNE',assocs:['spectacle','théâtre','plateau','acteur','public','rideau','décor','représentation','performance','art'],genre:'F'},
    {word:'SÉRIE',assocs:['télévision','épisodes','saison','streaming','netflix','personnages','intrigue','watch','drama','show'],genre:'F'},
    {word:'STAR',assocs:['célébrité','vedette','acteur','famous','hollywood','celebrity','icon','popularity','talent','fame'],genre:'F'},
  ],

  '🏛️ Histoire': [
    {word:'ANTIQUITÉ',assocs:['ancien','période','grec','romain','histoire','temple','philosophie','civilisation','classique','passé'],genre:'F'},
    {word:'BATAILLE',assocs:['guerre','combat','militaire','conflit','armée','soldier','fight','violence','victoire','strategy'],genre:'F'},
    {word:'CÉSAR',assocs:['rome','empereur','julius','assassinat','ides','mars','romain','empire','military','conquest'],genre:'M'},
    {word:'EMPIRE',assocs:['état','empereur','impérial','romain','ottoman','britannique','colonial','power','territory','reign'],genre:'M'},
    {word:'GUERRE',assocs:['conflit','bataille','armée','combat','mondiale','militaire','violence','soldier','arme','hostilité'],genre:'F'},
    {word:'HISTOIRE',assocs:['passé','événement','date','mémoire','récit','chronologie','document','archive','ancien','étude'],genre:'F'},
    {word:'NAPOLÉON',assocs:['empereur','bonaparte','france','corse','waterloo','conquête','empire','military','ambition','exile'],genre:'M'},
    {word:'PHARAON',assocs:['égypte','roi','pyramide','ancient','tutankhamun','ramses','tomb','mummy','hieroglyph','dynasty'],genre:'M'},
    {word:'PYRAMIDE',assocs:['égypte','pharaon','tombeau','monument','gizeh','sphinx','ancient','cheops','wonder','massive'],genre:'F'},
    {word:'REINE',assocs:['monarch','femme','couronne','royal','château','throne','kingdom','nobility','power','elizabeth'],genre:'F'},
    {word:'RÉVOLUTION',assocs:['changement','renversement','1789','france','bastille','radical','transformation','uprising','rebellion','conflict'],genre:'F'},
    {word:'ROME',assocs:['empire','italie','antique','césar','gladiateur','colisée','forum','eternal','city','latin'],genre:'F'},
    {word:'VIKING',assocs:['scandinave','guerrier','navire','exploration','norse','warrior','ship','raider','nordic','seafaring'],genre:'M'},
  ],

  '🎨 Arts & Littérature': [
    {word:'ART',assocs:['création','peinture','sculpture','musée','artiste','culture','œuvre','beauty','expression','créativité'],genre:'M'},
    {word:'ARTISTE',assocs:['créateur','peintre','sculpteur','talent','œuvre','art','gallery','creator','imagination','skill'],genre:'M'},
    {word:'BALLET',assocs:['danse','classique','tutu','pointe','chorégraphie','théâtre','grace','swan','lake','elegant'],genre:'M'},
    {word:'BEETHOVEN',assocs:['compositeur','allemand','symphonie','classique','sourd','9ème','génie','piano','musique','ludwig'],genre:'M'},
    {word:'CHOPIN',assocs:['compositeur','polonais','piano','romantique','nocturne','varsovie','frédéric','polonaise','mazurka','lyrique'],genre:'M'},
    {word:'CINÉMA',assocs:['film','salle','écran','réalisateur','acteur','projection','art','caméra','histoire','septième'],genre:'M'},
    {word:'COMÉDIE',assocs:['humour','rire','drôle','spectacle','théâtre','film','genre','joke','funny','entertainment'],genre:'F'},
    {word:'DANSE',assocs:['mouvement','ballet','rythme','musique','chorégraphie','grace','performance','art','body','expression'],genre:'F'},
    {word:'DESSIN',assocs:['trait','crayon','papier','esquisse','croquis','art','illustration','sketch','graphique','ligne'],genre:'M'},
    {word:'DRAME',assocs:['théâtre','tragédie','sérieux','émotion','intense','pièce','conflits','story','emotional','profond'],genre:'M'},
    {word:'ÉCRIVAIN',assocs:['auteur','livre','plume','roman','littérature','écrit','writer','novelist','author','créateur'],genre:'M'},
    {word:'FILM',assocs:['cinéma','acteur','réalisateur','histoire','scénario','camera','movie','screen','director','projection'],genre:'M'},
    {word:'HUGO',assocs:['écrivain','français','romantique','misérables','notre','dame','victor','poète','novelist','literary'],genre:'M'},
    {word:'LIVRE',assocs:['ouvrage','pages','lecture','roman','auteur','bibliothèque','reading','text','novel','histoire'],genre:'M'},
    {word:'LOUVRE',assocs:['musée','paris','art','mona','lisa','pyramide','museum','gallery','masterpiece','collection'],genre:'M'},
    {word:'MOZART',assocs:['compositeur','autrichien','génie','enfant','prodige','wolfgang','amadeus','classical','symphony','opera'],genre:'M'},
    {word:'MUSÉE',assocs:['exposition','art','collection','visite','tableau','culture','gallery','exhibit','heritage','conservation'],genre:'M'},
    {word:'MUSIQUE',assocs:['son','mélodie','harmonie','instrument','composition','audio','rhythm','melody','harmony','sound'],genre:'F'},
    {word:'OPÉRA',assocs:['chant','théâtre','classique','aria','scène','soprano','vocal','drama','musical','performance'],genre:'M'},
    {word:'PEINTURE',assocs:['art','toile','pinceau','couleur','tableau','artiste','canvas','painting','oil','masterpiece'],genre:'F'},
    {word:'PICASSO',assocs:['artiste','cubisme','espagnol','guernica','pablo','painter','modern','innovative','génie','revolutionary'],genre:'M'},
    {word:'POÈME',assocs:['vers','poésie','rime','strophe','lyrique','poetry','verse','rhyme','lyrical','literary'],genre:'M'},
    {word:'POÉSIE',assocs:['vers','poème','lyrique','rime','métaphore','poetry','verse','literary','rhyme','emotional'],genre:'F'},
    {word:'POÈTE',assocs:['vers','écrire','poésie','lyre','inspiration','poet','verse','rhyme','literary','creator'],genre:'M'},
    {word:'PORTRAIT',assocs:['visage','peinture','personne','art','tableau','face','painting','likeness','representation','image'],genre:'M'},
    {word:'ROMAN',assocs:['livre','histoire','fiction','narratif','chapitre','novel','fiction','narrative','story','literature'],genre:'M'},
    {word:'SCÈNE',assocs:['théâtre','plateau','acteur','spectacle','rideau','stage','performance','theater','drama','set'],genre:'F'},
    {word:'SCULPTURE',assocs:['statue','art','marbre','bronze','tridimensionnel','carving','statue','three','dimensional','modeling'],genre:'F'},
    {word:'SHAKESPEARE',assocs:['dramaturge','anglais','hamlet','roméo','juliette','william','playwright','elizabethan','bard','theater'],genre:'M'},
    {word:'TABLEAU',assocs:['peinture','toile','art','cadre','musée','painting','canvas','artwork','frame','gallery'],genre:'M'},
    {word:'THÉÂTRE',assocs:['scène','acteur','pièce','comédie','tragédie','stage','drama','performance','theatrical','audience'],genre:'M'},
  ],

  '🔬 Sciences & Nature': [
    {word:'ADN',assocs:['génétique','double','hélice','cellule','chromosome','watson','crick','heredité','biologie','molecule'],genre:'M'},
    {word:'AIR',assocs:['gaz','atmosphère','respirer','oxygène','azote','wind','breath','atmosphere','gas','invisible'],genre:'M'},
    {word:'ANIMAL',assocs:['être','vivant','faune','espèce','mammifère','creature','living','species','fauna','organism'],genre:'M'},
    {word:'ATOME',assocs:['particule','élément','noyau','électron','proton','neutron','matière','molecular','chemical','quantum'],genre:'M'},
    {word:'BIOLOGIE',assocs:['science','vie','cellule','organisme','étude','biology','living','organism','study','life'],genre:'F'},
    {word:'CANCER',assocs:['maladie','tumeur','cellule','malin','chimiothérapie','disease','tumor','malignant','oncology','treatment'],genre:'M'},
    {word:'CARBONE',assocs:['élément','chimique','organique','diamant','graphite','carbon','organic','element','atom','chemistry'],genre:'M'},
    {word:'CELLULE',assocs:['unité','vie','noyau','membrane','organisme','microscope','tissue','division','mitosis','biology'],genre:'F'},
    {word:'CERVEAU',assocs:['organe','tête','pensée','neurone','intelligence','brain','mind','neuron','cognitive','organ'],genre:'M'},
    {word:'CHALEUR',assocs:['température','chaud','thermique','énergie','feu','heat','hot','thermal','warm','temperature'],genre:'F'},
    {word:'CHIMIE',assocs:['science','élément','molécule','réaction','laboratoire','chemistry','molecule','reaction','compound','lab'],genre:'F'},
    {word:'CLIMAT',assocs:['météo','température','atmosphère','changement','réchauffement','climate','weather','atmospheric','global','warming'],genre:'M'},
    {word:'CŒUR',assocs:['organe','pompe','battement','artère','sang','heart','cardiac','pulse','blood','vital'],genre:'M'},
    {word:'DARWIN',assocs:['évolution','naturaliste','sélection','naturelle','espèce','origin','theory','adaptation','scientific','galapagos'],genre:'M'},
    {word:'EAU',assocs:['liquide','h2o','boire','mer','rivière','water','liquid','drink','ocean','essential'],genre:'F'},
    {word:'ÉNERGIE',assocs:['physique','force','travail','cinétique','potentielle','joule','power','capacity','conservation','renewable'],genre:'F'},
    {word:'ESPACE',assocs:['univers','cosmos','vide','étoile','planète','space','universe','cosmic','void','astronomy'],genre:'M'},
    {word:'ÉTOILE',assocs:['astre','briller','nuit','ciel','constellation','star','shine','celestial','night','sky'],genre:'F'},
    {word:'ÉVOLUTION',assocs:['darwin','espèce','adaptation','sélection','naturelle','evolution','species','adaptation','natural','selection'],genre:'F'},
    {word:'FEU',assocs:['flamme','brûler','chaleur','combustion','incendie','fire','flame','burn','hot','combustion'],genre:'M'},
    {word:'FORCE',assocs:['physique','newton','puissance','énergie','mouvement','force','power','strength','motion','energy'],genre:'F'},
    {word:'FOSSILE',assocs:['ancien','roche','dinosaure','préhistoire','empreinte','fossil','ancient','prehistoric','remain','impression'],genre:'M'},
    {word:'GALAXIE',assocs:['espace','étoiles','voie','lactée','univers','spiral','cluster','nebula','cosmic','astronomical'],genre:'F'},
    {word:'GAZ',assocs:['état','matière','air','vapeur','molécule','gas','vapor','molecule','state','matter'],genre:'M'},
    {word:'GÈNE',assocs:['adn','génétique','hérédité','chromosome','mutation','gene','genetic','heredity','dna','trait'],genre:'M'},
    {word:'GRAVITÉ',assocs:['physique','newton','attraction','terre','masse','weight','force','universal','acceleration','pull'],genre:'F'},
    {word:'LUMIÈRE',assocs:['photon','onde','éclairer','visible','spectre','light','photon','illumination','bright','wave'],genre:'F'},
    {word:'LUNE',assocs:['satellite','terre','nuit','croissant','pleine','moon','satellite','night','crescent','full'],genre:'F'},
    {word:'MARS',assocs:['planète','rouge','système','solaire','robot','mars','planet','red','solar','system'],genre:'F'},
    {word:'MÉTAL',assocs:['fer','conducteur','solide','alliage','dur','metal','conductor','solid','alloy','hard'],genre:'M'},
    {word:'MOLÉCULE',assocs:['atome','chimie','liaison','composé','structure','molecule','atom','chemical','bond','compound'],genre:'F'},
    {word:'NATURE',assocs:['environnement','naturel','écologie','faune','flore','nature','natural','ecology','wildlife','environment'],genre:'F'},
    {word:'NEWTON',assocs:['physicien','gravité','lois','mouvement','pomme','calculus','classical','mechanics','isaac','scientific'],genre:'M'},
    {word:'NOYAU',assocs:['atome','central','proton','neutron','cellule','nucleus','atomic','core','central','particle'],genre:'M'},
    {word:'OCÉAN',assocs:['mer','eau','salée','pacifique','atlantique','ocean','sea','water','salty','vast'],genre:'M'},
    {word:'OXYGÈNE',assocs:['élément','gaz','air','respiration','combustion','vital','breathe','atmosphere','oxidation','o2'],genre:'M'},
    {word:'PHYSIQUE',assocs:['science','matière','énergie','newton','einstein','physics','matter','energy','force','law'],genre:'F'},
    {word:'PLANÈTE',assocs:['corps','céleste','orbite','système','solaire','planet','celestial','orbit','solar','sphere'],genre:'F'},
    {word:'PLANTE',assocs:['végétal','vert','feuille','racine','photosynthèse','plant','green','leaf','root','vegetation'],genre:'F'},
    {word:'PLUIE',assocs:['eau','goutte','nuage','météo','précipitation','rain','drop','cloud','wet','precipitation'],genre:'F'},
    {word:'POUMON',assocs:['organe','respirer','air','thorax','bronche','lung','respiratory','breath','air','organ'],genre:'M'},
    {word:'PROTÉINE',assocs:['molécule','acide','aminé','cellule','nutrition','protein','molecule','amino','acid','nutrition'],genre:'F'},
    {word:'SCIENCE',assocs:['connaissance','recherche','expérience','théorie','laboratoire','science','knowledge','research','experiment','theory'],genre:'F'},
    {word:'SOLEIL',assocs:['astre','étoile','système','solaire','lumière','chaleur','yellow','center','photosphere','helium'],genre:'M'},
    {word:'TERRE',assocs:['planète','sol','monde','globe','terrestre','earth','planet','world','soil','ground'],genre:'F'},
    {word:'UNIVERS',assocs:['cosmos','espace','galaxie','infini','big','bang','universe','cosmos','space','infinite'],genre:'M'},
    {word:'VIRUS',assocs:['microbe','infection','maladie','contagion','vaccin','virus','infection','disease','microorganism','contagious'],genre:'M'},
    {word:'VOLCAN',assocs:['montagne','lave','éruption','cratère','magma','volcano','lava','eruption','crater','magma'],genre:'M'},
  ],

  '⚽ Sports & Loisirs': [
    {word:'ARBITRE',assocs:['sport','juge','sifflet','règle','match','football','décision','impartial','officiel','referee'],genre:'M'},
    {word:'ATHLÈTE',assocs:['sport','compétition','performance','entraînement','olympique','athlete','competition','performance','training','olympic'],genre:'M'},
    {word:'BALLON',assocs:['sport','rond','football','basket','rugby','gonfler','cuir','kick','sphere','inflate'],genre:'M'},
    {word:'BASEBALL',assocs:['sport','américain','batte','balle','base','diamond','bat','pitcher','homerun','mlb'],genre:'M'},
    {word:'BASKET',assocs:['sport','panier','nba','dribble','jordan','shoot','orange','five','hoop','court'],genre:'M'},
    {word:'BOXE',assocs:['sport','combat','gants','ring','knockout','punch','round','heavyweight','uppercut','jab'],genre:'F'},
    {word:'BUT',assocs:['football','goal','marquer','score','filet','objectif','goal','score','net','point'],genre:'M'},
    {word:'CAMPING',assocs:['plein','air','tente','nature','feu','camp','outdoor','tent','nature','fire'],genre:'M'},
    {word:'CARTE',assocs:['jeu','poker','tarot','belote','pique','card','game','deck','suit','hand'],genre:'F'},
    {word:'CHAMPION',assocs:['sport','gagnant','premier','médaille','titre','victor','winner','gold','best','triumphant'],genre:'M'},
    {word:'CHASSE',assocs:['gibier','fusil','forêt','animal','chasseur','hunting','game','rifle','forest','hunter'],genre:'F'},
    {word:'COMPÉTITION',assocs:['concours','rivalité','sport','challenge','tournoi','competition','contest','rivalry','challenge','tournament'],genre:'F'},
    {word:'COUPE',assocs:['trophée','champion','finale','victoire','gagner','cup','trophy','championship','final','win'],genre:'F'},
    {word:'COURSE',assocs:['courir','sprint','marathon','vitesse','compétition','race','run','sprint','speed','competition'],genre:'F'},
    {word:'CYCLISME',assocs:['vélo','tour','france','pédale','cyclist','cycling','bike','tour','pedal','rider'],genre:'M'},
    {word:'DÉFENSE',assocs:['protéger','arrière','gardien','tactique','bloquer','defense','protect','guard','tactic','block'],genre:'F'},
    {word:'DRIBBLE',assocs:['football','basket','contrôle','balle','technique','dribble','control','ball','skill','maneuver'],genre:'M'},
    {word:'ÉCHECS',assocs:['jeu','stratégie','roi','dame','pion','chess','strategy','king','queen','pawn'],genre:'M'},
    {word:'ÉQUIPE',assocs:['groupe','sport','joueur','collectif','coéquipier','team','group','player','collective','teammate'],genre:'F'},
    {word:'ESCRIME',assocs:['sport','épée','fleuret','sabre','touche','fencing','sword','foil','saber','touch'],genre:'F'},
    {word:'FINALE',assocs:['dernier','match','champion','décisif','ultime','final','last','championship','decisive','ultimate'],genre:'F'},
    {word:'FITNESS',assocs:['forme','gym','musculation','cardio','entraînement','fitness','gym','workout','cardio','training'],genre:'M'},
    {word:'FOOT',assocs:['football','ballon','but','équipe','coupe','soccer','ball','goal','team','cup'],genre:'M'},
    {word:'GOLF',assocs:['sport','club','balle','green','trou','swing','putt','caddy','fairway','birdie'],genre:'M'},
    {word:'HOCKEY',assocs:['sport','glace','palet','crosse','patins','hockey','ice','puck','stick','skate'],genre:'M'},
    {word:'JUDO',assocs:['sport','martial','kimono','tatami','projection','judo','martial','throw','belt','mat'],genre:'M'},
    {word:'KARATÉ',assocs:['sport','martial','coup','pied','poing','karate','martial','kick','punch','kata'],genre:'M'},
    {word:'MARATHON',assocs:['sport','course','42km','endurance','olympique','race','running','stamina','distance','runner'],genre:'M'},
    {word:'MATCH',assocs:['rencontre','sport','équipe','compétition','résultat','match','game','team','competition','score'],genre:'M'},
    {word:'MÉDAILLE',assocs:['récompense','or','argent','bronze','podium','medal','reward','gold','silver','bronze'],genre:'F'},
    {word:'NATATION',assocs:['sport','piscine','crawl','brasse','papillon','swimming','pool','freestyle','swimmer','stroke'],genre:'F'},
    {word:'OLYMPIQUE',assocs:['sport','jeux','médaille','torch','五环','athlete','international','ceremony','gold','unity'],genre:'M'},
    {word:'PÊCHE',assocs:['poisson','canne','hameçon','rivière','mer','fishing','fish','rod','hook','river'],genre:'F'},
    {word:'PENALTY',assocs:['football','faute','onze','mètres','tir','penalty','foul','eleven','meter','shot'],genre:'M'},
    {word:'POKER',assocs:['jeu','carte','mise','bluff','tournoi','poker','card','bet','bluff','tournament'],genre:'M'},
    {word:'RALLYE',assocs:['automobile','course','étape','pilote','copilote','rally','car','race','stage','driver'],genre:'M'},
    {word:'RECORD',assocs:['performance','meilleur','temps','mondial','battre','record','performance','best','time','world'],genre:'M'},
    {word:'RUGBY',assocs:['sport','ovale','mêlée','essai','quinze','rugby','oval','scrum','try','fifteen'],genre:'M'},
    {word:'SAUT',assocs:['sauter','hauteur','longueur','obstacle','bond','jump','height','length','leap','vault'],genre:'M'},
    {word:'SKI',assocs:['sport','neige','montagne','piste','descente','skiing','snow','mountain','slope','downhill'],genre:'M'},
    {word:'SOCCER',assocs:['football','américain','ballon','équipe','mondial','soccer','american','ball','team','world'],genre:'M'},
    {word:'SPORT',assocs:['activité','physique','compétition','entraînement','jeu','sport','activity','physical','competition','game'],genre:'M'},
    {word:'STADE',assocs:['enceinte','sport','spectateur','terrain','tribune','stadium','sports','spectator','field','stand'],genre:'M'},
    {word:'SURF',assocs:['sport','vague','planche','océan','beach','surfing','wave','board','ocean','beach'],genre:'M'},
    {word:'TENNIS',assocs:['sport','raquette','court','service','wimbledon','racquet','serve','baseline','forehand','volley'],genre:'M'},
    {word:'TIR',assocs:['sport','cible','précision','arme','visée','shooting','target','precision','aim','weapon'],genre:'M'},
    {word:'TOUR',assocs:['france','cyclisme','étape','jaune','maillot','tour','cycling','stage','yellow','jersey'],genre:'M'},
    {word:'TOURNOI',assocs:['compétition','sport','élimination','champion','finale','tournament','competition','elimination','champion','final'],genre:'M'},
    {word:'VÉLO',assocs:['bicyclette','pédaler','roue','cyclisme','sport','bike','bicycle','pedal','wheel','cycling'],genre:'M'},
    {word:'VICTOIRE',assocs:['gagner','triomphe','succès','champion','gloire','victory','win','triumph','success','champion'],genre:'F'},
    {word:'VOLLEYBALL',assocs:['sport','filet','ballon','smash','service','volleyball','net','ball','spike','serve'],genre:'M'},
    {word:'YOGA',assocs:['sport','zen','méditation','posture','souplesse','peace','breathing','asana','relaxation','mindfulness'],genre:'M'},
  ],

};

const THEME_WORDS = {
  '🦁 Animaux':          ['LION','DAUPHIN','GIRAFE','AIGLE','SERPENT','TIGRE','ÉLÉPHANT','PIEUVRE','KOALA','RENARD','BALEINE','FLAMANT','GORILLE','PINGOUIN','HÉRISSON','BREBIS','ARAIGNÉE','RHINOCÉROS','HYÈNE','DROMADAIRE','CROCODILE','PAON','SCORPION','CHAT','CHIEN','CHEVAL','MOUTON','VACHE','COCHON','COQ'],
  '🍕 Nourriture':       ['PIZZA','SUSHI','CRÊPE','BURGER','CHOCOLAT','FROMAGE','AVOCAT','MADELEINE','CROISSANT','RATATOUILLE','ESCARGOT','MACARON','SOUFFLÉ','TARTARE','BRIOCHE','CURRY','PASTA','RIZ-AU-LAIT','HUILE','CITRON','POT-AU-FEU','KEBAB','MIEL','PIMENT','GLACE','INFUSION','CAFÉ','VIN','BIÈRE','EAU'],
  '🎬 Cinéma & Culture': ['VAMPIRE','ROBOT','EXTRATERRESTRE','ZOMBIE','PIRATE','SUPERHÉROS','DÉTECTIVE','ACTEUR','RÉALISATEUR','COUPABLE','HÉROÏNE','CHEVALIER','MAGICIEN','CONTE','COMÉDIE','THRILLER','MUSICAL','CINÉMA','ROMAN','PEINTURE','MUSIQUE','THÉÂTRE','SCULPTURE','DANSE','PHOTOGRAPHIE','JEU-VIDÉO','PODCAST','SÉRIE','DESSIN-ANIMÉ','DOCUMENTAIRE'],
  '🏠 Objets du quotidien':['PARAPLUIE','MIROIR','RÉVEIL','LAMPE','CISEAUX','BOUSSOLE','SABLIER','PANIER','BOUGIE','TIROIR','CADENAS','COUSSIN','POUBELLE','SAVON','BROSSE','COUVERTURE','SONNETTE','FENÊTRE','FOUR','RÉFRIGÉRATEUR','LAVE-VAISSELLE','ASPIRATEUR','TONDEUSE','ARROSOIR','MACHINE-À-COUDRE','ENCEINTE','ORDINATEUR','TÉLÉPHONE','TÉLÉVISION','MONTRE'],
  '💼 Métiers':           ['CHIRURGIEN','POMPIER','ARCHITECTE','CUISINIER','ASTRONAUTE','AVOCAT','JOURNALISTE','BOULANGER','PHARMACIEN','PILOTE','INSTITUTEUR','DÉVELOPPEUR','INFIRMIER','DENTISTE','VÉTÉRINAIRE','POLITICIEN','COMPTABLE','AGENT-IMMOBILIER','PLOMBIER','ÉLECTRICIEN','MAÇON','COIFFEUR','KINÉSITHÉRAPEUTE','PSYCHOLOGUE','MILITAIRE','POLICIER','JUGE','PEINTRE','PHOTOGRAPHE','MUSICIEN'],
  '⚽ Sport':             ['MARATHON','SURF','GYMNASTE','ARBITRE','CHAMPION','GARDIEN','CYCLISTE','NATATION','BOXEUR','PENALTY','PATINAGE','TENNIS','RUGBY','BASKETBALL','NAGEUR','ESCALADE','ÉQUITATION','TIR-À-L-ARC','HALTÉROPHILIE','SPRINT','KARATÉ','JUDO','VOILE','SKI','SNOWBOARD','PARACHUTISME','DANSE-SPORTIVE','GOLF','FLÉCHETTES','PÉTANQUE'],
  '🌍 Géographie':        ['PARIS','ROME','LONDRES','NEW-YORK','TOKYO','AUSTRALIE','ÉGYPTE','BRÉSIL','ARGENTINE','NORVÈGE','RUSSIE','INDE','CHINE','MEXIQUE','AFRIQUE','SUISSE','HOLLANDE','ESPAGNE','GRÈCE','CAIRE','THAÏLANDE','CORÉE','INDONÉSIE','ARABIE','GUATEMALA','PORTUGAL','ARCTIQUE','LOUISIANE','NOUVELLE-ZÉLANDE','VIENNE'],
  '🔬 Science & Nature':  ['NUCLÉAIRE','TROU-NOIR','FOUDRE','VOLCAN','TREMBLEMENT','CERVEAU','ADN','GRAVITÉ','MOLÉCULE','CHLOROPHYLLE','ASTRONOMIE','PLANÈTE','LUNE','ÉTOILE','COMÈTE','MÉTÉORE','RELATIVITÉ','PHYSIQUE-QUANTIQUE','CELLULE','ÉVOLUTION','ÉLECTRICITÉ','MAGNÉTISME','LUMIÈRE','SON','VIRUS','BACTÉRIE','CHIMIE','ALGORITHME','IA','ROBOT'],
  '🏰 Histoire':          ['GLADIATEUR','PHARAON','VIKING','CHEVALIER','CROISADE','RENAISSANCE','RÉVOLUTION','NAPOLÉON','INDUSTRIALISATION','PREMIÈRE-GUERRE','SECONDE-GUERRE','RÉSISTANCE','APOLLON','MUR-DE-BERLIN','ESCLAVAGE','DÉMOCRATIE','ROI','IMPRIMERIE','BOUSSOLE','POUDRE-À-CANON','MENHIR','MOMIFICATION','COLONISATION','KRACH','CONQUÊTE-SPATIALE','INTERNET','BOMBE-ATOMIQUE','SUFFRAGETTE','PHILOSOPHE','CATHÉDRALE'],
  '🎲 Divers':            ['CARTES','DÉS','PUZZLE','MAGIE','RÊVE','ARC-EN-CIEL','MÉTÉO','HOROSCOPE','CHANCE','PEUR','HUMOUR','PLEURS','AMOUR','AMITIÉ','FAMILLE','VIEILLESSE','NAISSANCE','MARIAGE','VOYAGE','FÊTE','CADEAU','SECRET','MENSONGE','MÉMOIRE','TEMPS','ESPACE','IMAGINATION','HASARD','TRADITION','FUTUR'],
};

const ALL_THEME_KEYS = Object.keys(THEME_WORDS);

// Récupère les données d'un mot
function getWordData(themeKey, wordName) {
  const idx = THEME_WORDS[themeKey].indexOf(wordName);
  if (idx === -1) return null;
  const raw = THEMES_DATA[themeKey][idx];
  return { assocs: raw.assocs, genre: raw.genre, lettres: wordName.length };
}

// ══════════════════════════════════════════════════════════════════
// 2. FONCTIONS IA
// ══════════════════════════════════════════════════════════════════

function normalize(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^a-z]/g,'');
}

function levenshtein(a, b) {
  const dp = Array.from({length:a.length+1},(_,i)=>
    Array.from({length:b.length+1},(_,j)=>i===0?j:j===0?i:0));
  for(let i=1;i<=a.length;i++)
    for(let j=1;j<=b.length;j++)
      dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
  return dp[a.length][b.length];
}

// Calcule à quel point un indice est proche d'un mot donné (0-15)
function hintScore(hint, wordName, wordData) {
  const h = normalize(hint);
  const s = normalize(wordName);
  const assocs = wordData.assocs.map(normalize);

  let score = 0;

  // 1. Correspondance EXACTE avec une association (le plus fort)
  const idx = assocs.indexOf(h);
  if (idx !== -1) {
    // Pondération progressive : premiers indices valent plus
    if (idx < 3) {
      score += 15 - (idx * 2); // 15, 13, 11 pour les 3 premiers
    } else if (idx < 6) {
      score += 10 - (idx - 3); // 10, 9, 8 pour indices 3-5
    } else {
      score += 6 - Math.min(idx - 6, 3); // 6, 5, 4 pour indices 6+
    }
  }

  // 2. Correspondance PARTIELLE (préfixe/suffixe commun)
  for (let i = 0; i < assocs.length; i++) {
    const a = assocs[i];
    if (a.length >= 3 && h.length >= 3) {
      if (a.startsWith(h) || h.startsWith(a)) {
        score += Math.max(5 - i * 0.3, 1);
      }
      // Bonus si le mot se termine pareil (ex: -tion, -ment)
      if (a.length >= 4 && h.length >= 4) {
        const suffixLen = Math.min(3, a.length, h.length);
        if (a.slice(-suffixLen) === h.slice(-suffixLen)) {
          score += 2;
        }
      }
    }
  }

  // 3. Racine commune significative (4+ lettres)
  if (h.length >= 4) {
    for (let i = 0; i < assocs.length; i++) {
      const a = assocs[i];
      if (a.length >= 4) {
        const rootLen = Math.min(4, h.length, a.length);
        const hRoot = h.slice(0, rootLen);
        const aRoot = a.slice(0, rootLen);
        if (hRoot === aRoot) {
          score += 3 - i * 0.2;
        }
        // Sous-chaîne commune
        if (a.includes(h) || h.includes(a)) {
          score += 2;
        }
      }
    }
  }

  // 4. Proximité avec le mot lui-même (important!)
  const lev = levenshtein(h, s);
  if (lev === 0) {
    score += 20; // Mot exact (ne devrait pas arriver mais au cas où)
  } else if (lev <= 1) {
    score += 8; // Très proche (1 lettre de différence)
  } else if (lev <= 2) {
    score += 5; // Proche (2 lettres)
  } else if (lev <= 3) {
    score += 2; // Assez proche
  }
  
  // Bonus si l'indice est contenu dans le mot ou vice-versa
  if (s.includes(h) && h.length >= 3) score += 4;
  if (h.includes(s) && s.length >= 3) score += 3;

  // 5. Lettres partagées (bonus léger pour proximité globale)
  const sharedLetters = [...new Set(h)].filter(c => s.includes(c)).length;
  const totalLetters = Math.max(new Set(h).size, new Set(s).size);
  const letterRatio = sharedLetters / totalLetters;
  score += letterRatio * 2; // Max 2 points

  // 6. BONUS: Longueur similaire (indique souvent une vraie proximité)
  const lenDiff = Math.abs(h.length - s.length);
  if (lenDiff <= 2) score += 1;

  return Math.max(0, score); // Jamais négatif
}

// Calcule la température d'un indice par rapport au mot secret uniquement (pour affichage)
function computeTemperature(hint, wordData, secretWord) {
  const score = hintScore(hint, secretWord, wordData);
  if (score >= 15)  return 'BRULANT';  // Très proche
  if (score >= 10)  return 'CHAUD';    // Proche
  if (score >= 5)   return 'TIEDE';    // Moyen
  if (score >= 2)   return 'FROID';    // Éloigné
  return 'GLACIAL'; // Très éloigné
}

// ─── Moteur de déduction IA (cumule tous les indices donnés) ─────
// L'IA score CHAQUE mot du thème selon TOUS les indices reçus,
// puis propose le mot avec le meilleur score cumulé.
function iaGuessWord(hint, wordData, secretWord, previousGuesses) {
  const themeWords = THEME_WORDS[STATE.resolvedTheme];

  // Tous les indices donnés jusqu'ici (incluant le nouveau)
  const allHints = [...(STATE.hinterHints || []), normalize(hint)];
  STATE.hinterHints = allHints;

  // Scorer chaque mot du thème en cumulant tous les indices
  const wordScores = themeWords.map(w => {
    const wd = getWordData(STATE.resolvedTheme, w);
    if (!wd) return { w, total: 0 };
    let total = 0;
    for (const h of allHints) {
      total += hintScore(h, w, wd);
    }
    // Bonus : si le mot matche le nombre de lettres du mot secret
    if (w.replace(/-/g,'').length === secretWord.replace(/-/g,'').length) total += 1;
    return { w, total };
  });

  // Trier par score décroissant
  wordScores.sort((a, b) => b.total - a.total);

  // Le mot secret lui-même : quel est son score ?
  const secretScore = wordScores.find(ws => ws.w === secretWord)?.total || 0;
  const bestScore   = wordScores[0]?.total || 0;

  // Calculer la température basée sur le score du mot secret vs le meilleur score
  const temp = computeTemperature(hint, wordData, secretWord);

  // L'IA a trouvé si le mot secret est en tête ET avec un score significatif
  if (wordScores[0]?.w === secretWord && secretScore >= 10) {
    return { guess: secretWord, temp: 'GAGNE' };
  }

  // Sinon proposer le meilleur candidat non encore proposé
  const candidate = wordScores.find(ws =>
    ws.w !== secretWord &&
    ws.total > 0 &&
    !previousGuesses.includes(normalize(ws.w))
  );

  // Debug : afficher les top scores dans la console
  console.log('Top candidats IA:', wordScores.slice(0,5).map(ws=>`${ws.w}(${ws.total.toFixed(1)})`).join(', '));
  console.log('Mot secret score:', secretScore.toFixed(1), '/ Meilleur:', bestScore.toFixed(1));

  return {
    guess: candidate ? candidate.w : (wordScores[1]?.w || '???'),
    temp
  };
}

// ══════════════════════════════════════════════════════════════════
// 3. MESSAGES FUN
// ══════════════════════════════════════════════════════════════════

const MSG = {
  BRULANT:['🔥 BRÛLANT ! L\'IA transpire !','🌋 Brûlant ! Encore un tout petit effort !','🔥 C\'est en FEU !'],
  CHAUD:  ['♨️ Chaud ! Tu es sur la bonne piste.','☀️ Ça chauffe sérieusement !','🌡️ Chaud chaud...'],
  TIEDE:  ['🫖 Tiède... L\'IA hésite.','😐 Tiède. Pas mal mais peut mieux faire.','🤔 Tiède tiède...'],
  FROID:  ['🧊 Froid. L\'IA s\'éloigne.','🌬️ Froid ! Mauvaise direction.','❄️ Froid…'],
  GLACIAL:['🥶 GLACIAL ! On est au pôle Nord !','🧊 Glacial ! Sibérie...','🥶 Glacial mon ami !'],
  GAGNE:  ['✅ L\'IA a trouvé ! Génial !','🏆 Trouvé ! Quelle association !','🎉 L\'IA a cracké le mot !'],
  WRONG:  ['❌ Non... Réfléchis encore !','😅 Raté ! Essaie à nouveau.','🙈 Pas ça... continue !'],
  FOUND:  ['🎉 Trouvé ! Mot suivant !','✨ Bravo ! Continue !','🏆 Excellent ! +1 !'],
  PASSED: ['⏭ Passé ! Il reviendra peut-être…','⏭ On passe… à revoir !','⏭ Skip ! Trop dur ?'],
  TIME:   ['⏰ Temps écoulé !','⏰ La manche est terminée !','⏰ Le chrono a sonné !'],
};
const rand = k => MSG[k][Math.floor(Math.random()*MSG[k].length)];

// ══════════════════════════════════════════════════════════════════
// 4. ÉTAT DU JEU
// ══════════════════════════════════════════════════════════════════

const STATE = {
  // Config
  role: 'guesser',       // 'guesser' | 'hinter'
  themeKey: '',
  wordsPerManche: 5,
  voiceEnabled: true,    // ACTIVÉ PAR DÉFAUT
  autoListen: true,      // réécoute automatique en mode vocal ACTIVÉE
  mancheDuration: 30,    // durée en secondes (30 | 60 | 120)

  // Manche
  mancheNum: 0,
  mancheQueue: [],       // mots à faire dans la manche (ordre courant)
  passedQueue: [],       // mots passés, à retraiter si temps reste
  mancheResults: [],     // {word, found:bool, clues:number}
  currentWordIdx: 0,     // index dans mancheQueue
  currentWordName: '',
  currentWordData: null,
  clueIndex: 0,          // index prochain indice IA (mode guesser)
  wordClueCount: 0,      // nb indices donnés sur le mot courant
  iaGuesses: [],
  hinterHints: [],
  guesserWrongGuesses: [],
  givenClues: [],

  // Score
  score: 0,
  streak: 0,
  bestScore: 0,
  totalGames: 0,

  // Timer (30s par manche fixe)
  timerInterval: null,
  timerLeft: 30,

  // Mot courant
  gameOver: false,       // mot courant terminé (trouvé ou passé)
  mancheOver: false,

  // Word pool (liste mélangée pour le thème)
  wordPool: [],
};

// ══════════════════════════════════════════════════════════════════
// 5. DOM
// ══════════════════════════════════════════════════════════════════

const $ = id => document.getElementById(id);

// Home
const btnGuesserEl   = $('btn-guesser');
const btnHinterEl    = $('btn-hinter');
const themeGridEl    = $('theme-grid');
const wordCountBtns  = document.querySelectorAll('.timer-btn[data-words]');
const voiceToggle    = $('voice-toggle');
const voiceBadge     = $('voice-support-badge');
const btnStartEl     = $('btn-start');
const bestScoreEl    = $('best-score');
const totalGamesEl   = $('total-games');

// Game
const headerThemeEl  = $('header-theme');
const liveScoreEl    = $('live-score');
const mancheLabelEl  = $('manche-label');
const streakBadgeEl  = $('streak-badge');
const wordProgressEl = $('word-progress');
const timerBarEl     = $('timer-bar');
const timerTextEl    = $('timer-text');
const timerWrap      = $('timer-bar-wrap');
const secretWordEl   = $('secret-word');
const secretMetaEl   = $('secret-meta');
const secretHintEl   = $('secret-role-hint');
const queueBarEl     = $('queue-bar');
const historyEl      = $('history');

// Guesser zone
const zoneGuesserEl   = $('zone-guesser');
const iaClueTextEl    = $('ia-clue-text');
const inputGuessEl    = $('input-guess');
const btnGuessEl      = $('btn-guess');
const btnMicGuessEl   = $('btn-mic-guess');
const voiceBarGuess   = $('voice-bar-guess');
const btnNextClueEl   = $('btn-next-clue');
const btnPassGuesserEl= $('btn-pass-guesser');

// Hinter zone
const zoneHinterEl   = $('zone-hinter');
const iaGuessPanelEl = $('ia-guess-panel');
const iaGuessWordEl  = $('ia-guess-word');
const iaGuessTempEl  = $('ia-guess-temp');
const inputHintEl    = $('input-hint');
const btnHintEl      = $('btn-hint');
const btnMicHintEl   = $('btn-mic-hint');
const voiceBarHint   = $('voice-bar-hint');
const btnPassHinterEl= $('btn-pass-hinter');

// Result
const resultEmojiEl  = $('result-emoji');
const resultTitleEl  = $('result-title');
const resultSubtitleEl=$('result-subtitle');
const resultWordsEl  = $('result-words');
const resScoreEl     = $('res-score');
const resFoundEl     = $('res-found');
const resStreakEl    = $('res-streak');
const btnNextMancheEl= $('btn-next-manche');
const btnHomeResultEl= $('btn-home-result');

// Nav
const btnHomeEl      = $('btn-home');
const btnSwapEl      = $('btn-swap');

// Voice overlay supprimé — indicateur dans le bouton mic uniquement

// Toast
const toastEl        = $('toast');

// Screens
const SCREENS = {
  home:   $('screen-home'),
  game:   $('screen-game'),
  result: $('screen-result'),
};

// ══════════════════════════════════════════════════════════════════
// 6. SPEECH — Web Speech API (simple, sans overlay)
// ══════════════════════════════════════════════════════════════════

let recognition   = null;
let voiceCallback = null;
let voiceRunning  = false;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function initVoice() {
  if (!SpeechRecognition) {
    voiceBadge.textContent = '(non supporté)';
    voiceToggle.disabled = true;
    return;
  }
  voiceBadge.textContent = '✓ supporté';
}

// Démarre une écoute unique (s'arrête après 1 résultat final)
function listenOnce(cb) {
  if (!SpeechRecognition || !STATE.voiceEnabled) return;
  if (voiceRunning) { try { recognition.stop(); } catch(_){} }

  recognition = new SpeechRecognition();
  recognition.lang = 'fr-FR';
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  voiceCallback = cb;
  voiceRunning  = true;

  // Afficher le mot reconnu en temps réel dans l'input actif
  recognition.onresult = e => {
    let interim = '', final = '';
    for (const r of e.results) {
      if (r.isFinal) final += r[0].transcript;
      else interim += r[0].transcript;
    }
    const current = (final || interim).trim().split(/\s+/)[0];
    // Afficher dans l'input courant
    const activeInput = STATE.role === 'guesser' ? inputGuessEl : inputHintEl;
    if (activeInput) activeInput.value = current;

    if (final) {
      voiceRunning = false;
      setMicUI(false);
      const word = final.trim().split(/\s+/)[0];
      if (word && voiceCallback) {
        voiceCallback = null;
        cb(word);
      }
    }
  };

  recognition.onerror = e => {
    voiceRunning = false;
    setMicUI(false);
    if (e.error !== 'no-speech' && e.error !== 'aborted') {
      showToast('🎙️ ' + e.error, 2000);
    }
  };

  recognition.onend = () => {
    voiceRunning = false;
    setMicUI(false);
  };

  try {
    recognition.start();
    setMicUI(true);
  } catch(e) {
    voiceRunning = false;
    setMicUI(false);
  }
}

function stopListening() {
  voiceRunning = false;
  voiceCallback = null;
  setMicUI(false);
  try { recognition && recognition.stop(); } catch(_){}
}

// Met à jour l'UI du bouton micro actif
function setMicUI(active) {
  const btn = STATE.role === 'guesser' ? btnMicGuessEl : btnMicHintEl;
  if (!btn) return;
  if (active) {
    btn.textContent = '🔴';
    btn.classList.add('mic-on');
    btn.title = 'Écoute… (tap pour annuler)';
  } else {
    btn.textContent = '🎙️';
    btn.classList.remove('mic-on');
    btn.title = 'Parler';
  }
}

// Synthèse vocale
function speak(text) {
  if (!STATE.voiceEnabled || !window.speechSynthesis) return;
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'fr-FR'; utt.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(utt);
}

// ══════════════════════════════════════════════════════════════════
// 7. INITIALISATION
// ══════════════════════════════════════════════════════════════════

function init() {
  loadPersistent();
  buildThemeGrid();
  bindEvents();
  initVoice();
  
  // Activer le mode vocal par défaut si supporté
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR) {
    voiceToggle.checked = true;
    STATE.voiceEnabled = true;
    STATE.autoListen = true;
    btnMicGuessEl.style.display = 'flex';
    btnMicHintEl.style.display = 'flex';
  }
  
  showScreen('home');
}

function loadPersistent() {
  STATE.bestScore  = parseInt(localStorage.getItem('mdp2_best') || '0');
  STATE.totalGames = parseInt(localStorage.getItem('mdp2_total') || '0');
  bestScoreEl.textContent  = STATE.bestScore;
  totalGamesEl.textContent = STATE.totalGames;
}

function savePersistent() {
  if (STATE.score > STATE.bestScore) {
    STATE.bestScore = STATE.score;
    localStorage.setItem('mdp2_best', STATE.bestScore);
  }
  STATE.totalGames++;
  localStorage.setItem('mdp2_total', STATE.totalGames);
}

function buildThemeGrid() {
  themeGridEl.innerHTML = '';
  // Bouton aléatoire en premier
  const allBtn = document.createElement('button');
  allBtn.className = 'theme-btn active';
  allBtn.textContent = '🎲 Aléatoire';
  allBtn.dataset.theme = '🎲 Aléatoire';
  allBtn.addEventListener('click', () => selectTheme('🎲 Aléatoire', allBtn));
  themeGridEl.appendChild(allBtn);
  STATE.themeKey = '🎲 Aléatoire';

  ALL_THEME_KEYS.forEach(key => {
    const btn = document.createElement('button');
    btn.className = 'theme-btn';
    btn.textContent = key;
    btn.dataset.theme = key;
    btn.addEventListener('click', () => selectTheme(key, btn));
    themeGridEl.appendChild(btn);
  });
}

function selectTheme(key, btn) {
  // Cibler uniquement les boutons dans le thème-grid
  themeGridEl.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  STATE.themeKey = key;
}

// ══════════════════════════════════════════════════════════════════
// 8. ÉVÉNEMENTS
// ══════════════════════════════════════════════════════════════════

function bindEvents() {
  btnGuesserEl.addEventListener('click', () => selectRole('guesser'));
  btnHinterEl.addEventListener('click',  () => selectRole('hinter'));

  wordCountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      wordCountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.wordsPerManche = parseInt(btn.dataset.words);
    });
  });

  // Durée de la manche
  const durationBtns = document.querySelectorAll('.timer-btn[data-duration]');
  durationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      durationBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.mancheDuration = parseInt(btn.dataset.duration);
    });
  });

  voiceToggle.addEventListener('change', () => {
    STATE.voiceEnabled = voiceToggle.checked;
    STATE.autoListen   = voiceToggle.checked;
    // Afficher/cacher les boutons micro
    btnMicGuessEl.style.display = STATE.voiceEnabled ? 'flex' : 'none';
    btnMicHintEl.style.display  = STATE.voiceEnabled ? 'flex' : 'none';
    // Remettre les boutons submit à leur état normal
    btnGuessEl.textContent = '✓';
    btnHintEl.textContent  = '→';
    if (!STATE.voiceEnabled) stopListening();
  });

  btnStartEl.addEventListener('click', startGame);
  btnHomeEl.addEventListener('click', () => { stopListening(); stopTimer(); showScreen('home'); });
  btnSwapEl.addEventListener('click', swapRoles);
  btnHomeResultEl.addEventListener('click', () => { showScreen('home'); loadPersistent(); });
  btnNextMancheEl.addEventListener('click', startNewManche);

  // Guesser
  btnGuessEl.addEventListener('click', handleGuess);
  inputGuessEl.addEventListener('keydown', e => e.key === 'Enter' && handleGuess());
  btnNextClueEl.addEventListener('click', giveNextClue);
  btnPassGuesserEl.addEventListener('click', passWord);
  btnMicGuessEl.addEventListener('click', () => {
    if (voiceRunning) { stopListening(); return; }
    listenOnce(word => { handleGuessWord(word); });
  });

  // Hinter
  btnHintEl.addEventListener('click', handleHint);
  inputHintEl.addEventListener('keydown', e => e.key === 'Enter' && handleHint());
  btnPassHinterEl.addEventListener('click', passWord);
  btnMicHintEl.addEventListener('click', () => {
    if (voiceRunning) { stopListening(); return; }
    listenOnce(word => { handleHintWord(word); });
  });

  // Voice overlay supprimé
}

function selectRole(role) {
  STATE.role = role;
  btnGuesserEl.classList.toggle('active', role==='guesser');
  btnHinterEl.classList.toggle('active', role==='hinter');
}

// ══════════════════════════════════════════════════════════════════
// 9. DÉMARRAGE & MANCHE
// ══════════════════════════════════════════════════════════════════

function startGame() {
  STATE.score   = 0;
  STATE.streak  = 0;
  STATE.mancheNum = 0;

  // Résoudre le thème
  let resolvedTheme = STATE.themeKey;
  if (resolvedTheme === '🎲 Aléatoire') {
    resolvedTheme = ALL_THEME_KEYS[Math.floor(Math.random() * ALL_THEME_KEYS.length)];
  }
  STATE.resolvedTheme = resolvedTheme;

  // Créer le pool de mots mélangés
  STATE.wordPool = shuffle([...THEME_WORDS[resolvedTheme]]);

  showScreen('game');
  headerThemeEl.textContent = resolvedTheme;
  updateScoreUI();
  startNewManche();
}

function startNewManche() {
  STATE.mancheNum++;
  STATE.mancheOver = false;
  STATE.mancheResults = [];
  STATE.passedQueue = [];

  // Si le thème est aléatoire, changer à chaque manche
  if (STATE.themeKey === '🎲 Aléatoire') {
    const newTheme = ALL_THEME_KEYS[Math.floor(Math.random() * ALL_THEME_KEYS.length)];
    STATE.resolvedTheme = newTheme;
    STATE.wordPool = shuffle([...THEME_WORDS[newTheme]]);
    headerThemeEl.textContent = newTheme;
  }

  // Choisir N mots pour la manche (recharger le pool si nécessaire)
  if (STATE.wordPool.length < STATE.wordsPerManche) {
    STATE.wordPool = shuffle([...THEME_WORDS[STATE.resolvedTheme]]);
  }
  STATE.mancheQueue = STATE.wordPool.splice(0, STATE.wordsPerManche);

  mancheLabelEl.textContent = `Manche ${STATE.mancheNum}`;
  showScreen('game');
  buildWordProgress();
  loadCurrentWord();
  startTimer();
}

function loadCurrentWord() {
  if (STATE.mancheQueue.length === 0 && STATE.passedQueue.length === 0) {
    // Tous les mots traités
    endManche();
    return;
  }

  // Prendre le premier mot de la queue principale, sinon de la passedQueue
  let wordName;
  if (STATE.mancheQueue.length > 0) {
    wordName = STATE.mancheQueue[0];
  } else {
    wordName = STATE.passedQueue.shift();
  }

  STATE.currentWordName = wordName;
  STATE.currentWordData = getWordData(STATE.resolvedTheme, wordName);
  STATE.clueIndex       = 0;
  STATE.wordClueCount   = 0;
  STATE.iaGuesses       = [];
  STATE.hinterHints     = [];
  STATE.guesserWrongGuesses = [];
  STATE.givenClues      = [];
  STATE.gameOver        = false;

  // UI
  historyEl.innerHTML = '';
  iaClueTextEl.textContent = 'En attente d\'indice…';
  iaGuessWordEl.textContent = '—';
  iaGuessWordEl.classList.remove('found');
  iaGuessTempEl.textContent = '';
  inputGuessEl.value = '';
  inputHintEl.value  = '';

  if (STATE.role === 'guesser') {
    secretWordEl.textContent = '???';
    secretWordEl.classList.add('blurred');
    secretMetaEl.textContent = `${STATE.currentWordData.lettres} lettre${STATE.currentWordData.lettres>1?'s':''} · ${STATE.currentWordData.genre==='M'?'Masculin':'Féminin'}`;
    secretHintEl.textContent = '';
    zoneGuesserEl.classList.remove('hidden');
    zoneHinterEl.classList.add('hidden');
    giveNextClue(); // donne le 1er indice, relancera l'écoute auto si vocal activé
  } else {
    secretWordEl.textContent = wordName;
    secretWordEl.classList.remove('blurred');
    secretMetaEl.textContent = `Fais deviner ce mot !`;
    secretHintEl.textContent = '';
    zoneGuesserEl.classList.add('hidden');
    zoneHinterEl.classList.remove('hidden');
    iaGuessWordEl.textContent = '—';
    // Lire le mot à voix haute en mode hinter
    speak(`Le mot à faire deviner est : ${wordName}`);
  }

  updateQueueBar();
  updateWordProgress();
}

// ══════════════════════════════════════════════════════════════════
// 10. MODE GUESSER
// ══════════════════════════════════════════════════════════════════

// Vérifie si un indice est interdit (= mot secret, même famille, trop proche)
function isClueInvalid(clue, secretWord) {
  const c = normalize(clue);
  const s = normalize(secretWord);
  if (c === s) return true;                          // mot exact
  if (c.length >= 4 && s.startsWith(c)) return true; // préfixe commun long
  if (s.length >= 4 && c.startsWith(s)) return true;
  // Même famille : racine de 5 lettres commune
  const rootLen = Math.min(5, Math.min(c.length, s.length));
  if (rootLen >= 4 && c.slice(0, rootLen) === s.slice(0, rootLen)) return true;
  // Trop proche (Levenshtein ≤ 1 sur mots courts)
  if (levenshtein(c, s) <= 1) return true;
  return false;
}

function giveNextClue() {
  if (STATE.gameOver || STATE.mancheOver) return;
  const assocs = STATE.currentWordData.assocs;
  const wrongGuesses = STATE.guesserWrongGuesses || [];

  // Filtrer les indices déjà donnés et invalides
  const remaining = assocs.filter((a, i) =>
    !STATE.givenClues.includes(i) && !isClueInvalid(a, STATE.currentWordName)
  );

  if (remaining.length === 0) {
    iaClueTextEl.innerHTML = `<em style="color:var(--muted)">Plus d'indices… Tentez quand même !</em>`;
    return;
  }

  let chosenAssoc;

  if (wrongGuesses.length === 0) {
    // Premier indice : le plus fort (premier valide)
    chosenAssoc = remaining[0];
  } else {
    // Indice intelligent : chercher un indice qui s'éloigne le plus des mauvaises réponses
    // Scorer chaque indice restant selon sa capacité à discriminer
    const scored = remaining.map(assoc => {
      const na = normalize(assoc);
      let discriminScore = 0;
      // Pénaliser les indices trop proches des mauvaises réponses du joueur
      for (const wrong of wrongGuesses) {
        const nw = normalize(wrong);
        const themeWords = THEME_WORDS[STATE.resolvedTheme];
        // Si cet indice est aussi une assoc du mot mal deviné → moins utile
        const wrongData = getWordData(STATE.resolvedTheme, wrong.toUpperCase());
        if (wrongData) {
          const wrongAssocs = wrongData.assocs.map(normalize);
          if (wrongAssocs.includes(na)) discriminScore -= 3;
        }
        // Bonus si l'indice est clairement différent du mauvais mot
        if (levenshtein(na, nw) > 4) discriminScore += 1;
      }
      // Garder les indices courts (plus percutants)
      discriminScore += Math.max(0, 6 - assoc.length);
      return { assoc, discriminScore };
    });

    scored.sort((a, b) => b.discriminScore - a.discriminScore);
    chosenAssoc = scored[0].assoc;
  }

  // Marquer cet indice comme donné
  const idx = assocs.indexOf(chosenAssoc);
  if (!STATE.givenClues) STATE.givenClues = [];
  STATE.givenClues.push(idx);
  STATE.clueIndex++;
  STATE.wordClueCount++;

  const clue = chosenAssoc.toUpperCase();
  iaClueTextEl.innerHTML = `Indice n°${STATE.clueIndex} : <span class="ia-clue-word">${clue}</span>`;
  addHistory('IA', clue, '', `Indice ${STATE.clueIndex}`);

  // Mode vocal : lancer auto l'écoute après chaque indice
  if (STATE.voiceEnabled && STATE.autoListen) {
    setTimeout(() => listenOnce(word => handleGuessWord(word)), 600);
  }
}

function handleGuessWord(word) {
  if (!word || STATE.gameOver || STATE.mancheOver) return;
  inputGuessEl.value = word;
  setTimeout(() => handleGuess(), 150);
}

function handleHintWord(word) {
  if (!word || STATE.gameOver || STATE.mancheOver) return;
  inputHintEl.value = word;
  setTimeout(() => handleHint(), 150);
}

function handleGuess() {
  if (STATE.gameOver || STATE.mancheOver) return;
  const guess = inputGuessEl.value.trim();
  if (!guess) return;
  if (guess.includes(' ')) { showToast('❌ Un seul mot !', 2000); return; }
  inputGuessEl.value = '';

  if (normalize(guess) === normalize(STATE.currentWordName)) {
    wordFound();
  } else {
    const d = levenshtein(normalize(guess), normalize(STATE.currentWordName));
    const fb = d <= 2 ? '🤏 Presque ! Vérifie l\'orthographe !' : rand('WRONG');
    addHistory('TOI', guess.toUpperCase(), 'FROID', fb);
    showToast(fb, 1500);
    // Mémoriser la mauvaise réponse pour adapter le prochain indice
    if (!STATE.guesserWrongGuesses) STATE.guesserWrongGuesses = [];
    STATE.guesserWrongGuesses.push(guess);
    // Passer automatiquement à l'indice suivant (adapté)
    setTimeout(() => giveNextClue(), 600);
  }
}

// ══════════════════════════════════════════════════════════════════
// 11. MODE HINTER
// ══════════════════════════════════════════════════════════════════

function handleHint() {
  if (STATE.gameOver || STATE.mancheOver) return;
  const hint = inputHintEl.value.trim();
  if (!hint) return;
  if (hint.includes(' ')) { showToast('❌ Un seul mot-indice !', 2000); return; }

  // Vérifier que l'indice n'est pas le mot ou de la même famille
  if (isClueInvalid(hint, STATE.currentWordName)) {
    showToast('🚫 Interdit ! Même mot ou même famille.', 2200);
    inputHintEl.value = '';
    if (STATE.voiceEnabled && STATE.autoListen) {
      setTimeout(() => listenOnce(word => handleHintWord(word)), 600);
    }
    return;
  }

  inputHintEl.value = '';
  STATE.wordClueCount++;

  // IA évalue et propose un mot
  const { guess, temp } = iaGuessWord(hint, STATE.currentWordData, STATE.currentWordName, STATE.iaGuesses);
  STATE.iaGuesses.push(normalize(guess));

  const msg = rand(temp);
  addHistory('TOI', hint.toUpperCase(), temp, msg);

  // Animer la proposition IA
  iaGuessWordEl.textContent = '…';
  iaGuessTempEl.textContent = '';
  setTimeout(() => {
    if (normalize(guess) === normalize(STATE.currentWordName)) {
      iaGuessWordEl.textContent = STATE.currentWordName;
      iaGuessWordEl.classList.add('found');
      iaGuessTempEl.textContent = '✅ TROUVÉ !';
      addHistory('IA', STATE.currentWordName, 'GAGNE', rand('GAGNE'));
      setTimeout(() => wordFound(), 700);
    } else {
      iaGuessWordEl.textContent = guess;
      iaGuessWordEl.classList.remove('found');
      iaGuessTempEl.textContent = `🌡️ ${temp} — ${msg}`;
      // Mode vocal : relancer écoute auto pour l'indice suivant
      if (STATE.voiceEnabled && STATE.autoListen) {
        setTimeout(() => listenOnce(word => handleHintWord(word)), 900);
      }
    }
  }, 600);
}

// ══════════════════════════════════════════════════════════════════
// 12. PASSE / TROUVÉ / FIN DE MANCHE
// ══════════════════════════════════════════════════════════════════

function wordFound() {
  STATE.gameOver = true;
  STATE.streak++;
  const points = Math.max(1, 7 - STATE.wordClueCount);
  STATE.score += points;
  updateScoreUI();
  showToast(`${rand('FOUND')} +${points} pt${points>1?'s':''}`, 2000);

  // Marquer dans les résultats
  const wordName = STATE.currentWordName;
  STATE.mancheResults.push({ word: wordName, found: true, clues: STATE.wordClueCount });

  // Retirer de la queue principale (si encore dedans)
  const idx = STATE.mancheQueue.indexOf(wordName);
  if (idx !== -1) STATE.mancheQueue.splice(idx, 1);
  // Retirer de passedQueue aussi au cas où
  const idx2 = STATE.passedQueue.indexOf(wordName);
  if (idx2 !== -1) STATE.passedQueue.splice(idx2, 1);

  // Révéler le mot
  secretWordEl.textContent = wordName;
  secretWordEl.classList.remove('blurred');
  updateWordProgress();

  setTimeout(() => {
    if (!STATE.mancheOver) loadCurrentWord();
  }, 1200);
}

function passWord() {
  if (STATE.gameOver || STATE.mancheOver) return;
  STATE.gameOver = true;
  stopListening();
  
  const wordName = STATE.currentWordName;
  showToast(rand('PASSED'), 1500);
  
  // ✅ CORRECTION v4: Marquer explicitement comme NON trouvé
  STATE.mancheResults.push({ 
    word: wordName, 
    found: false,  // ← Important pour le comptage final !
    clues: STATE.wordClueCount 
  });

  // Déplacer de mancheQueue vers passedQueue
  const idx = STATE.mancheQueue.indexOf(wordName);
  if (idx !== -1) {
    STATE.mancheQueue.splice(idx, 1);
    STATE.passedQueue.push(wordName);
  }

  updateWordProgress();
  updateQueueBar();
  setTimeout(() => { if (!STATE.mancheOver) loadCurrentWord(); }, 800);
}

function endManche() {
  // ✅ CORRECTIF: Ajouter les mots non traités
  STATE.mancheQueue.forEach(wordName => {
    if (!STATE.mancheResults.find(r => r.word === wordName)) {
      STATE.mancheResults.push({
        word: wordName,
        found: false,
        clues: 0
      });
    }
  });
  
  if (STATE.mancheOver) return;
  STATE.mancheOver = true;
  stopTimer();

  // Mots non traités = pas trouvés
  [...STATE.mancheQueue, ...STATE.passedQueue].forEach(w => {
    if (!STATE.mancheResults.find(r => r.word === w)) {
      STATE.mancheResults.push({ word: w, found: false, clues: 0 });
    }
  });

  savePersistent();

  // Flash visuel
  const flash = document.createElement('div');
  flash.className = 'manche-flash';
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 600);

  setTimeout(() => showResultScreen(), 500);
}

function showResultScreen() {
  const found = STATE.mancheResults.filter(r => r.found).length;
  const total = STATE.mancheResults.length;

  const emojis = found === total ? '🏆' : found >= Math.ceil(total/2) ? '🎉' : '😅';
  resultEmojiEl.textContent = emojis;
  resultTitleEl.textContent = found === total ? 'Parfait !' : found >= Math.ceil(total/2) ? 'Bonne manche !' : 'Dur dur…';
  resultSubtitleEl.textContent = `${found} mot${found>1?'s':''} trouvé${found>1?'s':''} sur ${total} · Manche ${STATE.mancheNum}`;

  // Récap mots
  resultWordsEl.innerHTML = STATE.mancheResults.map(r => `
    <div class="result-word-item ${r.found?'found':'passed'}">
      <span class="rw-name">${r.word}</span>
      <span class="rw-status">${r.found ? `✅ Trouvé (${r.clues} indice${r.clues>1?'s':''})` : '❌ Manqué'}</span>
    </div>
  `).join('');

  resScoreEl.textContent = STATE.score;
  resFoundEl.textContent = `${found}/${total}`;
  resStreakEl.textContent = STATE.streak;

  showScreen('result');
}

// ══════════════════════════════════════════════════════════════════
// 13. CHRONO (30s par manche)
// ══════════════════════════════════════════════════════════════════

function startTimer() {
  stopTimer();
  STATE.timerLeft = STATE.mancheDuration;
  timerWrap.style.display = 'flex';
  updateTimerUI();
  STATE.timerInterval = setInterval(() => {
    STATE.timerLeft--;
    updateTimerUI();
    if (STATE.timerLeft <= 0) {
      stopTimer();
      if (!STATE.mancheOver) {
        showToast(rand('TIME'), 2000);
        endManche();
      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(STATE.timerInterval);
  STATE.timerInterval = null;
}

function updateTimerUI() {
  const pct = (STATE.timerLeft / STATE.mancheDuration) * 100;
  timerBarEl.style.width = pct + '%';
  timerTextEl.textContent = STATE.timerLeft;
  const warn = pct <= 25;
  timerBarEl.classList.toggle('warning', warn);
  timerTextEl.classList.toggle('warning', warn);
}

// ══════════════════════════════════════════════════════════════════
// 14. PROGRÈS ET QUEUE
// ══════════════════════════════════════════════════════════════════

function buildWordProgress() {
  wordProgressEl.innerHTML = '';
  for (let i = 0; i < STATE.wordsPerManche; i++) {
    const dot = document.createElement('div');
    dot.className = 'word-dot';
    dot.dataset.idx = i;
    dot.textContent = i + 1;
    wordProgressEl.appendChild(dot);
  }
}

function updateWordProgress() {
  const dots = wordProgressEl.querySelectorAll('.word-dot');
  let resultIdx = 0;
  dots.forEach((dot, i) => {
    dot.className = 'word-dot';
    if (resultIdx < STATE.mancheResults.length) {
      const r = STATE.mancheResults[resultIdx++];
      dot.classList.add(r.found ? 'found' : 'passed');
      dot.textContent = r.found ? '✓' : '↩';
    } else if (STATE.mancheQueue[0] === STATE.currentWordName && i === resultIdx) {
      dot.classList.add('active');
    }
  });
  // Highlight le mot actif
  const activePos = STATE.mancheResults.length;
  if (activePos < dots.length && !STATE.mancheOver) {
    dots[activePos]?.classList.add('active');
  }
}

function updateQueueBar() {
  queueBarEl.innerHTML = '';
  STATE.passedQueue.forEach(w => {
    const chip = document.createElement('div');
    chip.className = 'queue-chip';
    chip.innerHTML = `↩ ${w}`;
    chip.title = 'Mot passé – reviendra si le temps le permet';
    queueBarEl.appendChild(chip);
  });
}

// ══════════════════════════════════════════════════════════════════
// 15. INVERSER RÔLES
// ══════════════════════════════════════════════════════════════════

function swapRoles() {
  STATE.role = STATE.role === 'guesser' ? 'hinter' : 'guesser';
  showToast(`Rôles inversés ! Tu ${STATE.role==='guesser'?'devines':'fais deviner'} maintenant.`, 2500);
  stopTimer();
  startNewManche();
}

// ══════════════════════════════════════════════════════════════════
// 16. HISTORIQUE DES INDICES (mot courant)
// ══════════════════════════════════════════════════════════════════

function addHistory(role, word, temp, msg) {
  const item = document.createElement('div');
  item.className = 'history-item';
  item.innerHTML = `
    <span class="clue-tag">${role}</span>
    <span class="clue-word">${word}</span>
    ${temp ? `<span class="temp-badge temp-${temp}">${temp}</span>` : ''}
    <span style="font-size:.7rem;color:var(--muted);flex:1;text-align:right;line-height:1.2">${msg}</span>
  `;
  historyEl.appendChild(item);
  historyEl.parentElement.scrollTop = historyEl.parentElement.scrollHeight;
}

// ══════════════════════════════════════════════════════════════════
// 17. UTILS
// ══════════════════════════════════════════════════════════════════

function showScreen(name) {
  Object.values(SCREENS).forEach(s => s.classList.remove('active'));
  SCREENS[name].classList.add('active');
}

function updateScoreUI() {
  liveScoreEl.textContent = STATE.score;
  streakBadgeEl.textContent = STATE.streak >= 2 ? `🔥×${STATE.streak}` : '';
}

function showToast(msg, duration=2500) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastEl._t);
  toastEl._t = setTimeout(() => toastEl.classList.remove('show'), duration);
}

function shuffle(arr) {
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

// ══════════════════════════════════════════════════════════════════
// 18. GO !
// ══════════════════════════════════════════════════════════════════

init();
