const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const Contribution = require('../models/Contribution');

// Get campaigns (supports ?status=pending or ?status=rejected for the Admin page)
router.get('/', async (req, res) => {
  try {
    const { all, status } = req.query;
    let filter = {};

    if (status) {
      filter.status = status; // e.g. pending or rejected
    } else if (!all) {
      filter.status = { $in: ['approved', 'live', 'completed'] }; // Public feed
    }

    const campaigns = await Campaign.find(filter).sort({ createdAt: -1 });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) return res.status(404).json({ error: 'Not found' });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const campaign = await Campaign.create({ ...req.body, status: 'pending' });
    res.status(201).json(campaign);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/:id/contribute', async (req, res) => {
  try {
    const { amount, userId } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }
    const contribution = await Contribution.create({
      campaignId: req.params.id,
      userId,
      amount,
    });
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { $inc: { raisedAmount: amount } },
      { new: true }
    );
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    res.json({ contribution, campaign });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATED: Review Route accepts object payload with notes and checklist
router.patch('/:id/review', async (req, res) => {
  try {
    const { status, reviewedBy, reviewNotes, checklist } = req.body;
    const allowed = ['approved', 'rejected', 'live', 'completed'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const campaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      { status, reviewedBy, reviewNotes, checklist },
      { new: true }
    );
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;