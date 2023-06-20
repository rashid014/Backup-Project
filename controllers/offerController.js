const Offer = require('../models/offerModel');
const Category = require('../models/categoryModel');

function renderOfferManagementPage(req, res) {
    // Fetch categories and offers
    Category.find()
      .then(categories => {
        Offer.find()
          .then(offers => {
            res.render('offer-management', { categories, offers });
          })
          .catch(err => {
            res.sendStatus(500);
          });
      })
      .catch(err => {
        res.sendStatus(500);
      });
  }
  
// Method to create a new offer
function createOffer(req, res) {
    const { title, description, startDate, endDate, isReferralOffer, categoryId } = req.body;
  
    const offer = new Offer({
      title,
      description,
      startDate,
      endDate,
      isReferralOffer,
      categoryId
    });
  
    offer.save()
      .then(() => {
        res.render('createOffer', { message: 'Offer created successfully' });
      })
      .catch(err => {
        res.render('error', { error: 'An error occurred while creating the offer' });
      });
  }
  

// Method to update an existing offer
function updateOffer(req, res) {
  const offerId = req.params.id;
  const { title, description, startDate, endDate, isReferralOffer, categoryId } = req.body;

  Offer.findByIdAndUpdate(offerId, {
    title,
    description,
    startDate,
    endDate,
    isReferralOffer,
    categoryId
  })
    .then(() => {
      res.status(200).json({ message: 'Offer updated successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: 'An error occurred while updating the offer' });
    });
}

// Method to delete an offer
function deleteOffer(req, res) {
  const offerId = req.params.id;

  Offer.findByIdAndDelete(offerId)
    .then(() => {
      res.status(200).json({ message: 'Offer deleted successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: 'An error occurred while deleting the offer' });
    });
}

// Method to get all offers
function getAllOffers(req, res) {
  Offer.find()
    .then(offers => {
      res.status(200).json(offers);
    })
    .catch(err => {
      res.status(500).json({ error: 'An error occurred while fetching the offers' });
    });
}

// Method to create a new category
function createCategory(req, res) {
  const { name } = req.body;

  const category = new Category({
    name
  });

  category.save()
    .then(() => {
      res.status(201).json({ message: 'Category created successfully' });
    })
    .catch(err => {
      res.status(500).json({ error: 'An error occurred while creating the category' });
    });
}

// Method to get all categories
function getAllCategories(req, res) {
  Category.find()
    .then(categories => {
      res.status(200).json(categories);
    })
    .catch(err => {
      res.status(500).json({ error: 'An error occurred while fetching the categories' });
    });
}

module.exports = {
  createOffer,
  updateOffer,
  deleteOffer,
  getAllOffers,
  createCategory,
  getAllCategories,
  renderOfferManagementPage
};
