# ─── BUILD EquipmentService ───────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build-equipment
WORKDIR /src

COPY EquipmentService/EquipmentService.API/EquipmentService.API.csproj EquipmentService.API/
COPY EquipmentService/EquipmentService.Application/EquipmentService.Application.csproj EquipmentService.Application/
COPY EquipmentService/EquipmentService.Domain/EquipmentService.Domain.csproj EquipmentService.Domain/
COPY EquipmentService/EquipmentService.Infrastructure/EquipmentService.Infrastructure.csproj EquipmentService.Infrastructure/
RUN dotnet restore EquipmentService.API/EquipmentService.API.csproj

COPY EquipmentService/EquipmentService.API/ EquipmentService.API/
COPY EquipmentService/EquipmentService.Application/ EquipmentService.Application/
COPY EquipmentService/EquipmentService.Domain/ EquipmentService.Domain/
COPY EquipmentService/EquipmentService.Infrastructure/ EquipmentService.Infrastructure/
RUN dotnet publish EquipmentService.API/EquipmentService.API.csproj -c Release -o /app/equipment

# ─── BUILD LocationService ────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build-location
WORKDIR /src

COPY LocationService/LocationService.API/LocationService.API.csproj LocationService.API/
COPY LocationService/LocationService.Application/LocationService.Application.csproj LocationService.Application/
COPY LocationService/LocationService.Domain/LocationService.Domain.csproj LocationService.Domain/
COPY LocationService/LocationService.Infrastructure/LocationService.Infrastructure.csproj LocationService.Infrastructure/
RUN dotnet restore LocationService.API/LocationService.API.csproj

COPY LocationService/LocationService.API/ LocationService.API/
COPY LocationService/LocationService.Application/ LocationService.Application/
COPY LocationService/LocationService.Domain/ LocationService.Domain/
COPY LocationService/LocationService.Infrastructure/ LocationService.Infrastructure/
RUN dotnet publish LocationService.API/LocationService.API.csproj -c Release -o /app/location

# ─── RUNTIME ──────────────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

COPY --from=build-equipment /app/equipment ./equipment
COPY --from=build-location  /app/location  ./location

# Script de arranque embebido directamente (sin depender de archivos externos)
RUN printf '#!/bin/bash\n\
echo "==> Starting EquipmentService on :80"\n\
ASPNETCORE_URLS="http://+:80" dotnet /app/equipment/EquipmentService.API.dll &\n\
echo "==> Starting LocationService on :81"\n\
ASPNETCORE_URLS="http://+:81" \\\n\
  ConnectionStrings__DefaultConnection="$LOC_ConnectionStrings__DefaultConnection" \\\n\
  Services__EquipmentService="$LOC_Services__EquipmentService" \\\n\
  dotnet /app/location/LocationService.API.dll &\n\
wait -n\n\
exit $?\n' > /app/start.sh && chmod +x /app/start.sh

EXPOSE 80 81

ENTRYPOINT ["/app/start.sh"]