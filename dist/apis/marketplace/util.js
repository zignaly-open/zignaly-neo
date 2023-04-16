export function marketplaceServiceToInvestmentType(service) {
    return {
        serviceId: service.id,
        ssc: service.ssc,
        serviceName: service.name,
        serviceLogo: service.logo,
        ownerName: service.ownerName,
        sparklines: service.sparklines,
        createdAt: service.createdAt,
        ownerVerified: service.ownerVerified,
        pnl30dPct: service.pnlPercent30t.toString(),
        pnl90dPct: service.pnlPercent90t.toString(),
        pnl180dPct: service.pnlPercent180t.toString(),
    };
}
export function marketplaceServiceToServiceType(service) {
    return service;
}
//# sourceMappingURL=util.js.map