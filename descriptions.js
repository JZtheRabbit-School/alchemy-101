import {CONTAINED} from './game.js';
export const descriptions={
'Fire':'Rapid oxidation, releasing heat and light. Excellent for discovery. Less excellent for curtains.',
'Water':'Two hydrogen atoms and one oxygen atom. Remarkably innocent, considering its drowning record.',
'Air':'A mixture of gases you need to breathe. Enjoy the privilege while it lasts.',
'Earth':'Minerals, organic matter, and the remains of things that had plans.',
'Sand':'Small grains of rock and minerals, worn down by weathering. Given enough time, even mountains fall apart. You have considerably less time.',
'Lightning':'A sudden electrical discharge. The sky has very poor impulse control.',
'Magma':'Molten rock beneath the surface. A drink best left unreviewed.',
'Dust':'Fine particles of matter. Most things eventually join the collection.',
'Cloud':'Tiny water droplets suspended in air. A remarkably large quantity of impending dampness.',
'Clay':'Fine mineral particles that become pliable when wet. Finally, something with fewer opinions than you.',
'Plant':'An organism that turns light into chemical energy. Already more productive than this basement.',
'Stone':'A solid piece of rock. It has survived quite a lot without asking for advice.',
'Pot':'A vessel for holding and heating things. It does not take responsibility for the contents.',
'Gunpowder':'A combustible powder that produces expanding gases. Best stored away from your remaining ambitions.',
'Algae':'Photosynthetic organisms that thrive in water. Your glass has acquired tenants.',
'Metal':'A material that conducts heat and electricity. Generous about sharing both with your fingers.',
'Blade':'A sharpened metal edge. The handle is apparently someone else’s problem.',
'Wire':'Metal drawn into a thin strand. An efficient way to carry electricity toward a mistake.',
'Bomb':'An explosive device. An unusually decisive approach to rearranging a room.',
'Wood':'The fibrous structural tissue of trees. A forest, with fewer future prospects.',
'Knife':'A handled blade for cutting. Now your bad decisions have a comfortable grip.',
'Blender':'A machine with rotating blades. Texture is a temporary condition.',
'Frog Eggs':'Amphibian embryos protected by jelly. Several futures, none of them consulted.',
'Frog':'An amphibian with permeable skin. It did not volunteer for basement research.',
'Twitching Frog Legs':'Muscles can contract in response to electrical stimulation. Movement is not always good news.',
'Campfire':'Burning wood that releases heat and light. Indoor camping has structural consequences.',
'Coal':'Carbon-rich fuel. Ancient life, preparing for one final disappointment.',
'Diamond':'Crystalline carbon with exceptional hardness. A handsome way to outlive everyone.',
'Glass':'A rigid, noncrystalline solid. Transparent about everything except when it will break.',
'Light Bulb':'An electric lamp. Currently waiting for a brighter idea.',
'Lightened Light Bulb':'An illuminated electric lamp. At last, a witness to your work.',
'Bottle':'A narrow-necked container. Suitable for keeping questionable decisions together.',
'A Glass of Water':'Water in a glass. An achievement civilization continues to underestimate.',
'A Pot of Water':'Water in a cooking vessel. Optimism, before ingredients.',
'A Pot of Frog':'Frog eggs in a pot of water. The catering arrangements are troubling.',
'A Glass of Frog':'Frog eggs in a glass of water. Not every garnish belongs in a drink.',
'Mushroom':'The fruiting body of a fungus. The insects seem to have read the invitation.',
'Lichen':'A partnership between fungi and photosynthetic organisms. Even rocks have better social lives.',
'Potion':'A prepared liquid mixture. The label seems to have omitted the useful information.',
'Vase':'A vessel used to display flowers. A small memorial to their roots.',
'Flies':'Insects with one functional pair of wings. Your work has attracted an audience.',
'Flower':'A plant’s reproductive structure. Romance has always been a biological complication.',
'Blood':'A fluid that transports oxygen and nutrients. Usually best kept on the inside.',
'Curse':'A supposed source of supernatural misfortune. Peer review has become difficult to contact.',
'Love Potion':'A mixture reputed to inspire affection. Consent was not included in the formulation.',
'Shark':'A cartilaginous fish with replaceable teeth. Your fingers are less renewable.',
'Cooked Meat':'Animal tissue altered by heat. The experiment is now technically dinner.',
'Broth':'A liquid made by cooking ingredients in water. Much has been reduced to this.',
'Moss':'A small, nonvascular plant that favors damp places. The basement is receiving excellent reviews.',
'Man Eating Plant':'A plant with a concerning appetite. Please remain outside the food chain.',
'Six-headed Shark':'One shark, six heads. Nature’s complaints department has stopped answering.',
'Gu Poison':'A poison associated with traditional tales of venomous creatures. Folklore has entered the laboratory.',
'Seeds':'Plant embryos with protective coverings and stored food. Hope, in convenient portions.',
'Flour':'Finely ground seeds or grain. Potential, thoroughly pulverized.',
'Dough':'Flour mixed with liquid. A promising substance with no idea what comes next.',
'Bread':'Dough transformed by heat. One of humanity’s more defensible experiments.',
'Vodka':'A distilled alcoholic spirit. Scientific judgment sold separately.',
'Molotov Cocktail':'A bottle containing flammable liquid. A terrible substitute for a table lamp.',
'Unicorn':'A legendary one-horned creature. The laboratory has abandoned its commitment to ordinary biology.',
'Cursed Blood':'Blood with an unfortunate supernatural reputation. The sample seems personally offended.',
'Sacred Blood':'Blood considered holy. An unusually complicated donation.'
};
descriptions['Glass Pane']='A flat sheet of glass. A window of opportunity, with sharp edges.';
descriptions['Glass Vessel']='A glass bottle for storing liquids. The contents remain your responsibility.';
descriptions.Pot='A clay vessel hardened by firing. Civilization began with pottery. Your research may end in it.';
descriptions.Magma='Molten rock, flowing at an unreasonable temperature. The floor is not a suitable container.';
descriptions.Vine='A climbing plant with curling tendrils. It has found a way up. You are still in the basement.';
descriptions.Grape='Fruit of a grapevine, rich in water and sugars. Its career is about to become considerably less wholesome.';
descriptions.Pulp='Crushed grape flesh, skins, seeds and juice. Potential, with its structural integrity removed.';
descriptions.Wine='An alcoholic drink made from fermented grapes. This laboratory has taken certain liberties with the waiting period.';
descriptions.Jesus='The central figure of Christianity. The bread and wine appear to have attracted someone’s attention.';
descriptions.Cross='Two pieces of wood joined at right angles. Its provenance makes this one a problem for certain visitors.';
descriptions['Holy Water']='Water blessed for religious use. Still water. Suddenly more selective about its audience.';
descriptions.Raisins='Dried grapes, with most of their water removed. Time has not improved their complexion.';
descriptions['Raisins Bread']='Bread with raisins in it. A discovery that will divide the household.';
for(const name of [...Object.keys(CONTAINED),'A Glass of Water','A Pot of Water','A Glass of Frog','A Pot of Frog']){
 const isPot=name.startsWith('A Pot of '),content=name.replace(/^A (Glass|Pot) of /,'');
 descriptions[name]=`A ${isPot?'pot':'glass'} of ${content}. What were you expecting? You literally just ${content==='Frog'?'put':'poured'} ${content} into a ${isPot?'pot':'glass'}.`;
}
delete descriptions.Glass;delete descriptions.Bottle;
