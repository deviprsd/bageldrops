from enum import Enum
from core.models import models, CoreModel


# class State(Enum):
#     AL = "Alabama"
#     AK = "Alaska"
#     AZ = "Arizona"
#     AR = "Arkansas"
#     CA = "California"
#     CO = "Colorado"
#     CT = "Connecticut"
#     DE = "Delaware"
#     FL = "Florida"
#     GA = "Georgia"
#     HI = "Hawaii"
#     ID = "Idaho"
#     IL = "Illinois"
#     IN = "Indiana"
#     IA = "Iowa"
#     KS = "Kansas"
#     KY = "Kentucky"
#     LA = "Louisiana"
#     ME = "Maine"
#     MD = "Maryland"
#     MA = "Massachusetts"
#     MI = "Michigan"
#     MN = "Minnesota"
#     MS = "Mississippi"
#     MO = "Missouri"
#     MT = "Montana"
#     NE = "Nebraska"
#     NV = "Nevada"
#     NH = "New Hampshire "
#     NJ = "New Jersey"
#     NM = "New Mexico"
#     NY = "New York"
#     NC = "North Carolina"
#     ND = "North Dakota"
#     OH = "Ohio"
#     OK = "Oklahoma"
#     OR = "Oregon"
#     PA = "Pennsylvania"
#     RI = "Rhode Island"
#     SC = "South Carolina"
#     SD = "South Dakota"
#     TN = "Tennessee"
#     TX = "Texas"
#     UT = "Utah"
#     VT = "Vermont"
#     VA = "Virginia"
#     WA = "Washington"
#     WV = "West Virginia"
#     WI = "Wisconsin"
#     WY = "Wyoming"


class TaxRate(Enum):
    AL = 0.04
    AK = 0.07
    AZ = 0.056
    AR = 0.065
    CA = 0.0725
    CO = 0.0635
    CT = 0.0635
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
    tax_rate = models.FloatField(
        'Tax Rate',
        choices=[(x.name, x.value) for x in TaxRate],
        default=TaxRate.WI.value,
        max_length=8
    )
    # state = models.CharField(
    #     'State',
    #     choices=[(x.name, x.value) for x in State],
    #     default='WI',
    #     max_length=20
    # )

    def __str__(self):
        return f'{self.TaxRate.name}'

