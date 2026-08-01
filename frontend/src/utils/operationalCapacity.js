export const DEFAULT_WEEKLY_CAPACITY = 5;

export const startOfDay = (date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

export const endOfDay = (date) => {
  const copy = new Date(date);
  copy.setHours(23, 59, 59, 999);
  return copy;
};

export const normalizeDate = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
};

export const getOperationalWindow = (days = 7) => {
  const start = startOfDay(new Date());
  const end = endOfDay(new Date(start.getFullYear(), start.getMonth(), start.getDate() + days));
  return { start, end };
};

export const isSeamstressActive = (item) => item?.ativa !== false && item?.ativo !== false;

export const getUpcomingServices = (services, start, end) => {
  return services.filter((service) => {
    const dueDate = normalizeDate(service?.prazo_entrega);
    if (!dueDate) return false;

    const dueAt = startOfDay(dueDate);
    return dueAt >= start && dueAt <= end;
  });
};

export const buildOperationalCapacityContext = (
  services,
  seamstresses,
  options = {}
) => {
  const { days = 7, defaultWeeklyCapacity = DEFAULT_WEEKLY_CAPACITY } = options;
  const { start, end } = getOperationalWindow(days);

  const servicesList = Array.isArray(services) ? services : [];
  const seamstressList = Array.isArray(seamstresses) ? seamstresses : [];
  const activeSeamstresses = seamstressList.filter(isSeamstressActive);

  const upcomingServices = getUpcomingServices(servicesList, start, end);

  const servicesBySeamstress = {};
  upcomingServices.forEach((service) => {
    const seamstressId = service?.costureira;
    if (!seamstressId) return;
    servicesBySeamstress[seamstressId] = (servicesBySeamstress[seamstressId] || 0) + 1;
  });

  const topLoad = Math.max(0, ...Object.values(servicesBySeamstress));
  const weeklyCapacity = Math.max(defaultWeeklyCapacity, topLoad);

  const workload = activeSeamstresses
    .map((item) => {
      const count = servicesBySeamstress[item.id] || 0;
      const percentage = Math.round((count / weeklyCapacity) * 100);

      return {
        id: item.id,
        name: item.nome,
        services: count,
        percentage,
      };
    })
    .sort((a, b) => b.services - a.services);

  const assignedServices = workload.reduce((acc, item) => acc + item.services, 0);
  const operationalCapacity = weeklyCapacity * activeSeamstresses.length;
  const utilization = operationalCapacity > 0
    ? Math.round((assignedServices / operationalCapacity) * 100)
    : 0;

  return {
    start,
    end,
    activeSeamstresses,
    upcomingServices,
    servicesBySeamstress,
    weeklyCapacity,
    assignedServices,
    operationalCapacity,
    utilization,
    workload,
  };
};
