import axios from '../custom-axios/axios'

class DocumentTags {
  login = (username, password) => {
    return axios.post('/login', {}, {
      params: {
        username,
        password
      }
    }).then(resp => {
      const token = resp.data?.token
      if (token) {
        localStorage.setItem('token', token)
      }
      return resp
    })
  }

  logout = () => {
    localStorage.removeItem('token')
  }

  isAuthenticated = () => {
    return localStorage.getItem('token') !== null
  }

  updateAnnotation = (recipeId, startIndex, length, tag) => {
    const promise = axios.get('/update-annotation', {
      params: {
        recipeId,
        startIndex,
        length,
        tag,
        token: localStorage.getItem('token')
      }
    })
    promise.catch(err => {
      console.log(err)
      alert('Please login before you do the mapping!')
    })
    return promise
  }

  removeAnnotation = (recipeId, startIndex, length) => {
    const promise = axios.get('/invalid-annotation', {
      params: {
        recipeId,
        startIndex,
        length: length || 1,
        token: localStorage.getItem('token')
      }
    })
    promise.catch(err => {
      console.log(err)
      alert('Please login before you do the mapping!')
    })
    return promise
  }

  loadRecipes = () => {
    return axios.get('/recipes')
  }

  loadFooDis = () => {
    return axios.get('/foo-dis')
  }

  loadCafeteria = () => {
    return axios.get('/cafeteria')
  }

  loadUncurated = () => {
    return axios.get('/uncurrated')
  }

  loadTags = (recipeId) => {
    return axios.get('/nerData', {
      params: {
        recipeId
      }
    })
  }

  predict = (text, model) => {
    return axios.get('/predict', {
      params: {
        text,
        model
      }
    })
  }

  loadResources () {
    return axios.get('/tuning_resources')
  }

  foodOntoMap () {
    return axios.get('/food-onto-map')
  }

  hansard () {
    return axios.get('/hansard-all')
  }

  foodon () {
    return axios.get('/foodon-all')
  }

  snomedct () {
    return axios.get('/snomedct-all')
  }

  searchIx (phrase, num_results) {
    return axios.get('/ix/search', {
      params: {
        phrase,
        num_results: num_results || 5
      }
    })
  }

  allModels = () => {
    return axios.get('/all_models')
  }

  allTags = () => {
    return [{ tag: 'AE', label: 'Animals' },
      { tag: 'AE.07', label: 'Animal body' },
      { tag: 'AE.07.b', label: 'Body and limbs' },
      { tag: 'AE.07.d', label: 'Covering/skin' },
      { tag: 'AE.08', label: 'Invertebrates' },
      { tag: 'AE.08.i', label: 'Class Insecta (insects)' },
      { tag: 'AE.10', label: 'Fish' },
      { tag: 'AE.10.g', label: 'Order Perciformes (perches)' },
      { tag: 'AE.11', label: 'Class Amphibia (amphibians)' },
      { tag: 'AE.12', label: 'Class Reptilia (reptiles)' },
      { tag: 'AE.12.b', label: 'Order Chelonia (turtles, tortoises)' },
      { tag: 'AE.12.d', label: 'Order Squamata (lizards, snakes)' },
      { tag: 'AE.12.d.01', label: 'Suborder Lacertilia (lizards)' },
      { tag: 'AE.12.d.02', label: 'Suborder Ophidia (snakes)' },
      { tag: 'AE.13', label: 'Class Aves (birds)' },
      { tag: 'AE.13.e', label: 'Young bird' },
      { tag: 'AE.13.h', label: 'Order Galliformes (fowls)' },
      { tag: 'AE.13.h.01', label: 'Genus Gallus (domestic fowl)' },
      { tag: 'AE.14', label: 'Class Mammalia (mammals)' },
      { tag: 'AE.14.d', label: 'Family Canidae (dogs)/member of' },
      { tag: 'AE.14.d.02', label: 'Dog' },
      { tag: 'AE.14.j', label: 'Family Equidae (general equines)' },
      { tag: 'AE.14.j.04', label: 'Habits and actions of horse' },
      { tag: 'AE.14.m', label: 'Group Ruminantia (sheep, goats, cows)' },
      { tag: 'AE.14.m.01', label: 'Genus Ovis (sheep)' },
      { tag: 'AE.14.m.03', label: 'Subfamily Bovinae (bovines)' },
      { tag: 'AF', label: 'Plants' },
      { tag: 'AF.02', label: 'Wild/cultivated plants' },
      { tag: 'AF.02.a', label: 'Food plant/vegetable' },
      { tag: 'AF.03', label: 'Valued plants and weeds' },
      { tag: 'AF.06', label: 'Plants defined by growth/development' },
      { tag: 'AF.10', label: 'Part of plant' },
      { tag: 'AF.10.a', label: 'Stem/stalk' },
      { tag: 'AF.10.b', label: 'Shoot/sprout/branch' },
      { tag: 'AF.10.e', label: 'Leaf' },
      { tag: 'AF.10.f', label: 'Plant substances' },
      { tag: 'AF.10.g', label: 'Flower/part containing reproductive organs' },
      { tag: 'AF.10.h', label: 'Reproductive product - fruit, nut' },
      { tag: 'AF.10.i', label: 'Seed' },
      { tag: 'AF.10.k', label: 'Cell/aggregate tissue' },
      { tag: 'AF.10.l', label: 'Wood, other part of tree/woody plant' },
      { tag: 'AF.11', label: 'Disease of/injury to plants' },
      { tag: 'AF.12', label: 'Particular plants/herbs/shrubs' },
      { tag: 'AF.13', label: 'Particular tree/shrub' },
      { tag: 'AF.13.c', label: 'Non-British trees/shrubs' },
      { tag: 'AF.19', label: 'Algae, seaweed' },
      { tag: 'AF.20', label: 'Particular food plant/product' },
      { tag: 'AF.20.b', label: 'Particular fruit-tree/-plant' },
      { tag: 'AF.20.c', label: 'Edible nuts/nut-trees' },
      { tag: 'AF.20.e', label: 'Particular vegetables' },
      { tag: 'AF.20.f', label: 'Pulses/plants producing pulses' },
      { tag: 'AF.20.g', label: 'Cereal/corn/grain' },
      { tag: 'AF.20.h', label: 'Yielding condiments/used in food preparation' },
      { tag: 'AF.21', label: 'Particular medicinal/food plants/parts' },
      { tag: 'AF.23', label: 'Particular timber trees/shrubs' },
      { tag: 'AF.24', label: 'Yielding fibre/thatching/basket material' },
      { tag: 'AF.26', label: 'Plant/nut/bean yielding oil' },
      { tag: 'AF.28', label: 'Fragrant plants/plants used in perfumery' },
      { tag: 'AF.29', label: 'Particular cultivated/ornamental plants' },
      { tag: 'AG', label: 'Food and drink' },
      { tag: 'AG.01', label: 'Food' },
      { tag: 'AG.01.a', label: 'Qualities of food' },
      { tag: 'AG.01.aa', label: 'Aerated/carbonated drink' },
      { tag: 'AG.01.ab', label: 'Fruit juice/squash' },
      { tag: 'AG.01.ac', label: 'Tea' },
      { tag: 'AG.01.ad', label: 'Coffee' },
      { tag: 'AG.01.ae', label: 'Cider-making' },
      { tag: 'AG.01.ae.01', label: 'Wine-making' },
      { tag: 'AG.01.ae.02', label: 'Malting' },
      { tag: 'AG.01.ae.03', label: 'Brewing' },
      { tag: 'AG.01.af', label: 'Tea manufacture' },
      { tag: 'AG.01.ag', label: 'Coffee manufacture' },
      { tag: 'AG.01.ah', label: 'Preparation of drinks' },
      { tag: 'AG.01.aj', label: 'Containers for drink' },
      { tag: 'AG.01.aj.01', label: 'Drinking vessel' },
      { tag: 'AG.01.ak', label: 'Drinking' },
      { tag: 'AG.01.ak.01', label: 'Drinking place' },
      { tag: 'AG.01.ak.02', label: 'Thirst' },
      { tag: 'AG.01.ak.02.a', label: 'Excess in drinking' },
      { tag: 'AG.01.b', label: 'Consistency of food' },
      { tag: 'AG.01.c', label: 'Diet' },
      { tag: 'AG.01.d', label: 'Animals for food' },
      { tag: 'AG.01.d.02', label: 'Part/joint of animal' },
      { tag: 'AG.01.d.03', label: 'Beef' },
      { tag: 'AG.01.d.04', label: 'Mutton' },
      { tag: 'AG.01.d.05', label: 'Pork' },
      { tag: 'AG.01.d.06', label: 'Fowls' },
      { tag: 'AG.01.d.07', label: 'Seafood' },
      { tag: 'AG.01.e', label: 'Dairy produce' },
      { tag: 'AG.01.e.01', label: 'Butter' },
      { tag: 'AG.01.e.02', label: 'Cheese' },
      { tag: 'AG.01.f', label: 'Fat/oil' },
      { tag: 'AG.01.g', label: 'Eggs' },
      { tag: 'AG.01.h', label: 'Fruit and vegetables' },
      { tag: 'AG.01.h.01', label: 'Fruit/a fruit' },
      { tag: 'AG.01.h.01.a', label: 'Citrus fruit' },
      { tag: 'AG.01.h.01.b', label: 'Berry' },
      { tag: 'AG.01.h.01.c', label: 'Apple' },
      { tag: 'AG.01.h.01.d', label: 'Pear' },
      { tag: 'AG.01.h.01.e', label: 'Fruit containing stone' },
      { tag: 'AG.01.h.01.f', label: 'Nut' },
      { tag: 'AG.01.h.02', label: 'Vegetables' },
      { tag: 'AG.01.h.02.a', label: 'Root vegetable' },
      { tag: 'AG.01.h.02.b', label: 'Stalk vegetables' },
      { tag: 'AG.01.h.02.c', label: 'Leaf vegetables' },
      { tag: 'AG.01.h.02.d', label: 'Cabbage/kale' },
      { tag: 'AG.01.h.02.e', label: 'Onion/leek/garlic' },
      { tag: 'AG.01.h.02.f', label: 'Fruits as vegetables' },
      { tag: 'AG.01.h.02.g', label: 'Pulse' },
      { tag: 'AG.01.h.02.h', label: 'Fungi' },
      { tag: 'AG.01.h.02.i', label: 'Herb' },
      { tag: 'AG.01.i', label: 'Corn/cereals/grain' },
      { tag: 'AG.01.j', label: 'Meal' },
      { tag: 'AG.01.k', label: 'Flour' },
      { tag: 'AG.01.l', label: 'Additive' },
      { tag: 'AG.01.l.01', label: 'Salt' },
      { tag: 'AG.01.l.02', label: 'Sweetener (syrup/honey/chocolate)' },
      { tag: 'AG.01.l.03', label: 'Spice' },
      { tag: 'AG.01.l.04', label: 'Sauce/dressing' },
      { tag: 'AG.01.m', label: 'Substances for food preparation' },
      { tag: 'AG.01.n', label: 'Dishes and prepared food' },
      { tag: 'AG.01.n.01', label: 'Food by way of preparation' },
      { tag: 'AG.01.n.02', label: 'Soup/pottage' },
      { tag: 'AG.01.n.03', label: 'Puddings' },
      { tag: 'AG.01.n.04', label: 'Jelly' },
      { tag: 'AG.01.n.05', label: 'Sausage' },
      { tag: 'AG.01.n.06', label: 'Meat dishes' },
      { tag: 'AG.01.n.08', label: 'Prepared fruit and dishes' },
      { tag: 'AG.01.n.09', label: 'Prepared vegetables and dishes' },
      { tag: 'AG.01.n.10', label: 'Grain dishes' },
      { tag: 'AG.01.n.11', label: 'Bread' },
      { tag: 'AG.01.n.12', label: 'Pancake/tortilla/oatcake' },
      { tag: 'AG.01.n.13', label: 'Cake' },
      { tag: 'AG.01.n.14', label: 'Biscuit' },
      { tag: 'AG.01.n.15', label: 'Pastry' },
      { tag: 'AG.01.n.16', label: 'Egg dishes' },
      { tag: 'AG.01.n.17', label: 'Confections/sweetmeats' },
      { tag: 'AG.01.n.17.a', label: 'Sweets' },
      { tag: 'AG.01.n.18', label: 'Preserve' },
      { tag: 'AG.01.o', label: 'Animal food' },
      { tag: 'AG.01.p', label: 'Amounts of food' },
      { tag: 'AG.01.r', label: 'Meal' },
      { tag: 'AG.01.r.03', label: 'Feast' },
      { tag: 'AG.01.r.04', label: 'Picnic/packed meal' },
      { tag: 'AG.01.s', label: 'Providing/receiving food' },
      { tag: 'AG.01.t', label: 'Food manufacture and preparation' },
      { tag: 'AG.01.t.02', label: 'Preparation of dairy produce' },
      { tag: 'AG.01.t.05', label: 'Preparation for table/cooking' },
      { tag: 'AG.01.t.06', label: 'Preserving/pickling' },
      { tag: 'AG.01.t.07', label: 'Cooking' },
      { tag: 'AG.01.t.08', label: 'Equipment for food preparation' },
      { tag: 'AG.01.u', label: 'Container for food, place for storing food' },
      { tag: 'AG.01.w', label: 'Setting table' },
      { tag: 'AG.01.x', label: 'Consumption of food/drink' },
      { tag: 'AG.01.x.01', label: 'Eating' },
      { tag: 'AG.01.x.02', label: 'Appetite' },
      { tag: 'AG.01.y', label: 'Drink' },
      { tag: 'AG.01.y.01', label: 'Intoxicating liquor' },
      { tag: 'AG.01.y.01.a', label: 'Wine' },
      { tag: 'AG.01.y.01.b', label: 'Ale/beer' },
      { tag: 'AG.01.y.01.c', label: 'Cider' },
      { tag: 'AG.01.y.01.e', label: 'Brandy' },
      { tag: 'AG.01.y.01.f', label: 'Gin' },
      { tag: 'AG.01.y.01.g', label: 'Cocktail' },
      { tag: 'AG.01.z', label: 'Water' }]
  }
}

export default new DocumentTags()
