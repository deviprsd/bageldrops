from enum import Enum
from core.models import models, CoreModel


class TaxRate(Enum):
    AL = 0.04
    AK = 0.07
    AZ = 0.056
    AR = 0.065
    CA = 0.0725
    CO = 0.0635
    DE = 0.0
    FL = 0.06
    GA = 0.04
    HI = 0.04
    ID = 0.06
    IL = 0.0625
    IN = 0.07
    IA = 0.06
    KS = 0.065
    KY = 0.06
    LA = 0.0445
    ME = 0.055
    MD = 0.06
    MA = 0.0625
    MI = 0.06
    MN = 0.06875
    MS = 0.07
    MO = 0.08113
    MT = 0.0
    NE = 0.055
    NV = 0.046
    NH = 0.0
    NJ = 0.06625
    NM = 0.05125
    NY = 0.045
    NC = 0.0475
    ND = 0.05
    OH = 0.0575
    OK = 0.08625
    OR = 0.0
    PA = 0.06
    RI = 0.07
    SC = 0.06
    SD = 0.06
    TN = 0.0925
    TX = 0.0625
    UT = 0.0485
    VT = 0.06
    VA = 0.043
    WA = 0.065
    WV = 0.06
    WI = 0.05
    WY = 0.04


class Tax(CoreModel):
    tax_rate = models.CharField(
        'Tax Rate',
        choices=[(x.name, x.value) for x in TaxRate],
        default=.05,
        max_length=8
    )

    def __str__(self):
        return f'{self.id}'
