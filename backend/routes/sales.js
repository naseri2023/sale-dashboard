const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// filter by date
router.get('/', async (req, res) => {
    try {
        const { startDate, endDate, productId, hasDiscount } = req.query;

        const filter = {};

        if (startDate && endDate) {
            filter.saleDate = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        if (productId) {
            filter.productId = Number(productId);
        }

        if (hasDiscount) {
            filter.discount = {
                $gt: 0
            }
        }

        const sales = await Sale.find(filter);
        res.json(sales);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// show total profit
router.get('/kpi/total-profit', async (req, res) => {
    try {
        const result = await Sale.aggregate([
            {
                $project: {
                    profit: {
                        $multiply: [
                            { $subtract: ["$unitPrice", "$unitCost"] },
                            "$quantitySold",
                            { $subtract: [1, "$discount"] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalProfit: { $sum: "$profit" }
                }
            }
        ]);

        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// filter by the most product profit
router.get('/kpi/top-product', async (req, res) => {
    try {
        const result = await Sale.aggregate([
            {
                $group: {
                    _id: "$productId",
                    totalQuantity: { $sum: "$quantitySold" }
                }
            },
            {
                $sort: { totalQuantity: -1 }
            },
            {
                $limit: 5
            }
        ]);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/kpi/top-discount', async (req, res) => {
    try {
        const result = await Sale.aggregate([
            {
                $group: {
                    _id: "$productId",
                    maxDiscount: { $max: "$discount"}
                }
            },
            {
                $sort: { maxDiscount: -1 }
            },
            {
                $limit: 5
            }
        ])
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/kpi/total-sale', async (req, res) => {
    try {
        const result = await Sale.aggregate([

            {
                $group: {
                    _id: null,
                    totalSale: { $sum: "$salesAmount" }
                }
            }
        ]);

        res.json(result[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/kpi/by-category', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const matchStage = {};
        if (startDate && endDate) {
            matchStage.saleDate = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const result = await Sale.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: "$productCategory",
                    totalSale: { $sum: "$salesAmount" }
                }
            }
        ]);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/kpi/by-region', async (req, res) => {
    try {
        const result = await Sale.aggregate([
            {
                $group: {
                    _id: "$region",
                    totalSale: { $sum: "$salesAmount" }
                }
            },
            {
                $sort: { totalSale: -1 }
            },
        ]);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/kpi/region-category', async (req, res) => {
    try {
        const result = await Sale.aggregate([
            {
                $group: {
                    _id: { region: "$region", category: "$productCategory" },
                    totalSale: { $sum: "$salesAmount" }
                }
            }
        ]);

        const reshaped = {};

        result.forEach((item) => {
            const { region, category } = item._id;

            if (!reshaped[region]) {
                reshaped[region] = { region };
            }

            reshaped[region][category] = item.totalSale;
        });

        res.json(Object.values(reshaped));

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;