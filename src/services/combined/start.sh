#!/bin/bash
# Levanta EquipmentService (puerto 80) y LocationService (puerto 81) en paralelo

echo "==> Starting EquipmentService on :80"
ASPNETCORE_URLS="http://+:80" \
  dotnet /app/equipment/EquipmentService.API.dll &

echo "==> Starting LocationService on :81"
# LocationService usa sus propias vars con prefijo LOC_
ASPNETCORE_URLS="http://+:81" \
  ConnectionStrings__DefaultConnection="$LOC_ConnectionStrings__DefaultConnection" \
  Services__EquipmentService="$LOC_Services__EquipmentService" \
  dotnet /app/location/LocationService.API.dll &

# Si cualquier proceso muere, el contenedor muere también
wait -n
exit $?