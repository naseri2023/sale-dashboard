function cleanData(data) {
    const cleaned = [];
    const seen = new Set();

    let report = {
        totalRows: data.length,
        removedForMissingFields: 0,
        removedForInvalidDiscount: 0,
        removedForNegativeValues: 0,
        removedForDuplicate: 0
    };

    data.forEach((row) => {
        // چک ۱: فیلدهای ضروری خالی نباشن
        if (!row.productId || !row.saleDate || isNaN(row.unitPrice) || isNaN(row.unitCost)) {
            report.removedForMissingFields++;
            return;
        }

        // چک ۲: تخفیف باید بین ۰ و ۱ باشه
        if (row.discount < 0 || row.discount > 1) {
            report.removedForInvalidDiscount++;
            return;
        }

        // چک ۳: مقادیر نباید منفی باشن
        if (row.quantitySold < 0 || row.unitPrice < 0 || row.unitCost < 0) {
            report.removedForNegativeValues++;
            return;
        }

        // چک ۴: تکراری نباشه
        const key = JSON.stringify(row);
        if (seen.has(key)) {
            report.removedForDuplicate++;
            return;
        }
        seen.add(key);

        cleaned.push(row);
    });

    report.remainingRows = cleaned.length;
    console.log('گزارش تمیزسازی داده:', report);

    return cleaned;
}

module.exports = cleanData;