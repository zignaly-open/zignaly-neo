export function serviceToInvestmentServiceDetail(service) {
    return {
        ownerVerified: service.ownerVerified,
        serviceName: service.name,
        serviceLogo: service.logo,
        serviceId: service.id,
        ssc: service.ssc,
    };
}
//# sourceMappingURL=util.js.map