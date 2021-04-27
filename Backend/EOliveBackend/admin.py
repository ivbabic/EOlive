from django.contrib import admin
from .models import evidencijagospodarstva, berba, podaci_radnje, prihranjivanje, spricanje

admin.site.register(evidencijagospodarstva)
admin.site.register(berba)
admin.site.register(podaci_radnje)
admin.site.register(prihranjivanje)
admin.site.register(spricanje)