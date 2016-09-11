Meteor.startup(function() {
    Meteor.setTimeout(function() {
      // if currency database is empty, seed these values
      if(Currency.find().count() < 1) {
        // users array
        var currency = [
            {
              currencyName: 'Afghan afghani',
              currencyIso: 'AFN',
              currencySymbol: ''
          },
          {
              currencyName: 'Albanian lek',
              currencyIso: 'ALL',
              currencySymbol: ''
          },
          {
              currencyName: 'Algerian dinar',
              currencyIso: 'DZD',
              currencySymbol: ''
          },
          {
              currencyName: 'Angolan kwanza',
              currencyIso: 'AOA',
              currencySymbol: ''
          },
          {
              currencyName: 'East Caribbean dollar',
              currencyIso: 'XCD',
              currencySymbol: 'EC$'
          },
          {
              currencyName: 'Argentine peso',
              currencyIso: 'ARS',
              currencySymbol: ''
          },
          {
              currencyName: 'Armenian dram',
              currencyIso: 'AMD',
              currencySymbol: ''
          },
          {
              currencyName: 'Aruban florin',
              currencyIso: 'AWG',
              currencySymbol: 'ƒ'
          },
          {
              currencyName: 'Australian dollar',
              currencyIso: 'AUD',
              currencySymbol: '$'
          },
          {
              currencyName: 'Azerbaijani manat',
              currencyIso: 'AZN',
              currencySymbol: ''
          },
          {
              currencyName: 'Bahamian dollar',
              currencyIso: 'BSD',
              currencySymbol: 'B$'
          },
          {
              currencyName: 'Bahraini dinar',
              currencyIso: 'BHD',
              currencySymbol: ''
          },
          {
              currencyName: 'Bangladeshi taka',
              currencyIso: 'BDT',
              currencySymbol: ''
          },
          {
              currencyName: 'Barbadian dollar',
              currencyIso: 'BBD',
              currencySymbol: 'Bds$'
          },
          {
              currencyName: 'Belarusian ruble',
              currencyIso: 'BYR',
              currencySymbol: 'Br'
          },
          {
              currencyName: 'Belize dollar',
              currencyIso: 'BZD',
              currencySymbol: 'BZ$'
          },
          {
              currencyName: 'Bermudian dollar',
              currencyIso: 'BMD',
              currencySymbol: 'BD$'
          },
          {
              currencyName: 'Bhutanese ngultrum',
              currencyIso: 'BTN',
              currencySymbol: 'Nu.'
          },
          {
              currencyName: 'Bolivian boliviano',
              currencyIso: 'BOB',
              currencySymbol: 'Bs.'
          },
          {
              currencyName: 'Bosnia and Herzegovina konvertibilna marka',
              currencyIso: 'BAM',
              currencySymbol: 'KM'
          },
          {
              currencyName: 'Botswana pula',
              currencyIso: 'BWP',
              currencySymbol: 'P'
          },
          {
              currencyName: 'Brazilian real',
              currencyIso: 'BRL',
              currencySymbol: 'R$'
          },
          {
              currencyName: 'Brunei dollar',
              currencyIso: 'BND',
              currencySymbol: 'B$'
          },
          {
              currencyName: 'Bulgarian lev',
              currencyIso: 'BGN',
              currencySymbol: ''
          },
          {
              currencyName: 'Burundi franc',
              currencyIso: 'BIF',
              currencySymbol: 'FBu'
          },
          {
              currencyName: 'Cambodian riel',
              currencyIso: 'KHR',
              currencySymbol: ''
          },
          {
              currencyName: 'Canadian dollar',
              currencyIso: 'CAD',
              currencySymbol: '$'
          },
          {
              currencyName: 'Cape Verdean escudo',
              currencyIso: 'CVE',
              currencySymbol: 'Esc'
          },
          {
              currencyName: 'Cayman Islands dollar',
              currencyIso: 'KYD',
              currencySymbol: 'KY$'
          },
          {
              currencyName: 'Chilean peso',
              currencyIso: 'CLP',
              currencySymbol: '$'
          },
          {
              currencyName: 'Chinese renminbi',
              currencyIso: 'CNY',
              currencySymbol: '¥'
          },
          {
              currencyName: 'Colombian peso',
              currencyIso: 'COP',
              currencySymbol: 'Col$'
          },
          {
              currencyName: 'Comorian franc',
              currencyIso: 'KMF',
              currencySymbol: ''
          },
          {
              currencyName: 'Central African CFA franc',
              currencyIso: 'XAF',
              currencySymbol: 'CFA'
          },
          {
              currencyName: 'Congolese franc',
              currencyIso: 'CDF',
              currencySymbol: 'F'
          },
          {
              currencyName: 'Costa Rican colon',
              currencyIso: 'CRC',
              currencySymbol: '₡'
          },
          {
              currencyName: 'Croatian kuna',
              currencyIso: 'HRK',
              currencySymbol: 'kn'
          },
          {
              currencyName: 'peso',
              currencyIso: 'CUC',
              currencySymbol: '$'
          },
          {
              currencyName: 'Czech koruna',
              currencyIso: 'CZK',
              currencySymbol: 'Kč'
          },
          {
              currencyName: 'Danish krone',
              currencyIso: 'DKK',
              currencySymbol: 'Kr'
          },
          {
              currencyName: 'Djiboutian franc',
              currencyIso: 'DJF',
              currencySymbol: 'Fdj'
          },
          {
              currencyName: 'Dominican peso',
              currencyIso: 'DOP',
              currencySymbol: 'RD$'
          },
          {
              currencyName: 'Egyptian pound',
              currencyIso: 'EGP',
              currencySymbol: '£'
          },
          {
              currencyName: 'Central African CFA franc',
              currencyIso: 'GQE',
              currencySymbol: 'CFA'
          },
          {
              currencyName: 'Eritrean nakfa',
              currencyIso: 'ERN',
              currencySymbol: 'Nfa'
          },
          {
              currencyName: 'Estonian kroon',
              currencyIso: 'EEK',
              currencySymbol: 'KR'
          },
          {
              currencyName: 'Ethiopian birr',
              currencyIso: 'ETB',
              currencySymbol: 'Br'
          },
          {
              currencyName: 'Falkland Islands pound',
              currencyIso: 'FKP',
              currencySymbol: '£'
          },
          {
              currencyName: 'Fijian dollar',
              currencyIso: 'FJD',
              currencySymbol: 'FJ$'
          },
          {
              currencyName: 'Gambian dalasi',
              currencyIso: 'GMD',
              currencySymbol: 'D'
          },
          {
              currencyName: 'Georgian lari',
              currencyIso: 'GEL',
              currencySymbol: ''
          },
          {
              currencyName: 'Ghanaian cedi',
              currencyIso: 'GHS',
              currencySymbol: ''
          },
          {
              currencyName: 'Gibraltar pound',
              currencyIso: 'GIP',
              currencySymbol: '£'
          },
          {
              currencyName: 'Guatemalan quetzal',
              currencyIso: 'GTQ',
              currencySymbol: 'Q'
          },
          {
              currencyName: 'Guinean franc',
              currencyIso: 'GNF',
              currencySymbol: 'FG'
          },
          {
              currencyName: 'Guyanese dollar',
              currencyIso: 'GYD',
              currencySymbol: 'GY$'
          },
          {
              currencyName: 'Haitian gourde',
              currencyIso: 'HTG',
              currencySymbol: 'G'
          },
          {
              currencyName: 'Honduran lempira',
              currencyIso: 'HNL',
              currencySymbol: 'L'
          },
          {
              currencyName: 'Hong Kong dollar',
              currencyIso: 'HKD',
              currencySymbol: 'HK$'
          },
          {
              currencyName: 'Hungarian forint',
              currencyIso: 'HUF',
              currencySymbol: 'Ft'
          },
          {
              currencyName: 'Icelandic króna',
              currencyIso: 'ISK',
              currencySymbol: 'kr'
          },
          {
              currencyName: 'Indian rupee',
              currencyIso: 'INR',
              currencySymbol: ''
          },
          {
              currencyName: 'Indonesian rupiah',
              currencyIso: 'IDR',
              currencySymbol: 'Rp'
          },
          {
              currencyName: 'Special Drawing Rights',
              currencyIso: 'XDR',
              currencySymbol: 'SDR'
          },
          {
              currencyName: 'Iranian rial',
              currencyIso: 'IRR',
              currencySymbol: ''
          },
          {
              currencyName: 'dinar',
              currencyIso: 'IQD',
              currencySymbol: ''
          },
          {
              currencyName: 'Israeli new sheqel',
              currencyIso: 'ILS',
              currencySymbol: ''
          },
          {
              currencyName: 'Jamaican dollar',
              currencyIso: 'JMD',
              currencySymbol: 'J$'
          },
          {
              currencyName: 'Japanese yen',
              currencyIso: 'JPY',
              currencySymbol: '¥'
          },
          {
              currencyName: 'Jordanian dinar',
              currencyIso: 'JOD',
              currencySymbol: ''
          },
          {
              currencyName: 'Kazakhstani tenge',
              currencyIso: 'KZT',
              currencySymbol: 'T'
          },
          {
              currencyName: 'Kenyan shilling',
              currencyIso: 'KES',
              currencySymbol: 'KSh'
          },
          {
              currencyName: 'North Korean won',
              currencyIso: 'KPW',
              currencySymbol: 'W'
          },
          {
              currencyName: 'South Korean won',
              currencyIso: 'KRW',
              currencySymbol: 'W'
          },
          {
              currencyName: 'Kuwaiti dinar',
              currencyIso: 'KWD',
              currencySymbol: ''
          },
          {
              currencyName: 'Kyrgyzstani som',
              currencyIso: 'KGS',
              currencySymbol: ''
          },
          {
              currencyName: 'kip',
              currencyIso: 'LAK',
              currencySymbol: 'KN'
          },
          {
              currencyName: 'Latvian lats',
              currencyIso: 'LVL',
              currencySymbol: 'Ls'
          },
          {
              currencyName: 'Lebanese lira',
              currencyIso: 'LBP',
              currencySymbol: ''
          },
          {
              currencyName: 'Lesotho loti',
              currencyIso: 'LSL',
              currencySymbol: 'M'
          },
          {
              currencyName: 'Liberian dollar',
              currencyIso: 'LRD',
              currencySymbol: 'L$'
          },
          {
              currencyName: 'Libyan dinar',
              currencyIso: 'LYD',
              currencySymbol: 'LD'
          },
          {
              currencyName: 'Lithuanian litas',
              currencyIso: 'LTL',
              currencySymbol: 'Lt'
          },
          {
              currencyName: 'Macanese pataca',
              currencyIso: 'MOP',
              currencySymbol: 'P'
          },
          {
              currencyName: 'Macedonian denar',
              currencyIso: 'MKD',
              currencySymbol: ''
          },
          {
              currencyName: 'Malagasy ariary',
              currencyIso: 'MGA',
              currencySymbol: 'FMG'
          },
          {
              currencyName: 'Malawian kwacha',
              currencyIso: 'MWK',
              currencySymbol: 'MK'
          },
          {
              currencyName: 'Malaysian ringgit',
              currencyIso: 'MYR',
              currencySymbol: 'RM'
          },
          {
              currencyName: 'Maldivian rufiyaa',
              currencyIso: 'MVR',
              currencySymbol: 'Rf'
          },
          {
              currencyName: 'Mauritanian ouguiya',
              currencyIso: 'MRO',
              currencySymbol: 'UM'
          },
          {
              currencyName: 'Mauritian rupee',
              currencyIso: 'MUR',
              currencySymbol: 'Rs'
          },
          {
              currencyName: 'Mexican peso',
              currencyIso: 'MXN',
              currencySymbol: '$'
          },
          {
              currencyName: 'Moldovan leu',
              currencyIso: 'MDL',
              currencySymbol: ''
          },
          {
              currencyName: 'Mongolian tugrik',
              currencyIso: 'MNT',
              currencySymbol: '₮'
          },
          {
              currencyName: 'Moroccan dirham',
              currencyIso: 'MAD',
              currencySymbol: ''
          },
          {
              currencyName: 'Mozambican metical',
              currencyIso: 'MZM',
              currencySymbol: 'MTn'
          },
          {
              currencyName: 'kyat',
              currencyIso: 'MMK',
              currencySymbol: 'K'
          },
          {
              currencyName: 'Namibian dollar',
              currencyIso: 'NAD',
              currencySymbol: 'N$'
          },
          {
              currencyName: 'Nepalese rupee',
              currencyIso: 'NPR',
              currencySymbol: 'NRs'
          },
          {
              currencyName: 'Netherlands Antillean gulden',
              currencyIso: 'ANG',
              currencySymbol: 'NAƒ'
          },
          {
              currencyName: 'franc',
              currencyIso: 'XPF',
              currencySymbol: 'F'
          },
          {
              currencyName: 'New Zealand dollar',
              currencyIso: 'NZD',
              currencySymbol: 'NZ$'
          },
          {
              currencyName: 'Nicaraguan córdoba',
              currencyIso: 'NIO',
              currencySymbol: 'C$'
          },
          {
              currencyName: 'Nigerian naira',
              currencyIso: 'NGN',
              currencySymbol: '₦'
          },
          {
              currencyName: 'Norwegian krone',
              currencyIso: 'NOK',
              currencySymbol: 'kr'
          },
          {
              currencyName: 'rial',
              currencyIso: 'OMR',
              currencySymbol: ''
          },
          {
              currencyName: 'Pakistani rupee',
              currencyIso: 'PKR',
              currencySymbol: 'Rs.'
          },
          {
              currencyName: 'Panamanian balboa',
              currencyIso: 'PAB',
              currencySymbol: 'B./'
          },
          {
              currencyName: 'Papua New Guinean kina',
              currencyIso: 'PGK',
              currencySymbol: 'K'
          },
          {
              currencyName: 'Paraguayan guarani',
              currencyIso: 'PYG',
              currencySymbol: ''
          },
          {
              currencyName: 'Peruvian nuevo sol',
              currencyIso: 'PEN',
              currencySymbol: 'S/.'
          },
          {
              currencyName: 'Philippine peso',
              currencyIso: 'PHP',
              currencySymbol: '₱'
          },
          {
              currencyName: 'Polish zloty',
              currencyIso: 'PLN',
              currencySymbol: ''
          },
          {
              currencyName: 'Qatari riyal',
              currencyIso: 'QAR',
              currencySymbol: 'QR'
          },
          {
              currencyName: 'Romanian leu',
              currencyIso: 'RON',
              currencySymbol: 'L'
          },
          {
              currencyName: 'Russian ruble',
              currencyIso: 'RUB',
              currencySymbol: 'R'
          },
          {
              currencyName: 'Rwandan franc',
              currencyIso: 'RWF',
              currencySymbol: 'RF'
          },
          {
              currencyName: 'São Tomé and Príncipe dobra',
              currencyIso: 'STD',
              currencySymbol: 'Db'
          },
          {
              currencyName: 'riyal',
              currencyIso: 'SAR',
              currencySymbol: 'SR'
          },
          {
              currencyName: 'Serbian dinar',
              currencyIso: 'RSD',
              currencySymbol: 'din.'
          },
          {
              currencyName: 'Seychellois rupee',
              currencyIso: 'SCR',
              currencySymbol: 'SR'
          },
          {
              currencyName: 'Sierra Leonean leone',
              currencyIso: 'SLL',
              currencySymbol: 'Le'
          },
          {
              currencyName: 'Singapore dollar',
              currencyIso: 'SGD',
              currencySymbol: 'S$'
          },
          {
              currencyName: 'Solomon Islands dollar',
              currencyIso: 'SBD',
              currencySymbol: 'SI$'
          },
          {
              currencyName: 'Somali shilling',
              currencyIso: 'SOS',
              currencySymbol: 'Sh.'
          },
          {
              currencyName: 'South African rand',
              currencyIso: 'ZAR',
              currencySymbol: 'R'
          },
          {
              currencyName: 'Sri Lankan rupee',
              currencyIso: 'LKR',
              currencySymbol: 'Rs'
          },
          {
              currencyName: 'Saint Helena pound',
              currencyIso: 'SHP',
              currencySymbol: '£'
          },
          {
              currencyName: 'Sudanese pound',
              currencyIso: 'SDG',
              currencySymbol: ''
          },
          {
              currencyName: 'Surinamese dollar',
              currencyIso: 'SRD',
              currencySymbol: '$'
          },
          {
              currencyName: 'Swazi lilangeni',
              currencyIso: 'SZL',
              currencySymbol: 'E'
          },
          {
              currencyName: 'Swedish krona',
              currencyIso: 'SEK',
              currencySymbol: 'kr'
          },
          {
              currencyName: 'franc',
              currencyIso: 'CHF',
              currencySymbol: 'Fr.'
          },
          {
              currencyName: 'Syrian pound',
              currencyIso: 'SYP',
              currencySymbol: ''
          },
          {
              currencyName: 'New Taiwan dollar',
              currencyIso: 'TWD',
              currencySymbol: 'NT$'
          },
          {
              currencyName: 'Tajikistani somoni',
              currencyIso: 'TJS',
              currencySymbol: ''
          },
          {
              currencyName: 'Tanzanian shilling',
              currencyIso: 'TZS',
              currencySymbol: ''
          },
          {
              currencyName: 'baht',
              currencyIso: 'THB',
              currencySymbol: '฿'
          },
          {
              currencyName: 'Trinidad and Tobago dollar',
              currencyIso: 'TTD',
              currencySymbol: 'TT$'
          },
          {
              currencyName: 'Tunisian dinar',
              currencyIso: 'TND',
              currencySymbol: 'DT'
          },
          {
              currencyName: 'Turkish new lira',
              currencyIso: 'TRY',
              currencySymbol: 'YTL'
          },
          {
              currencyName: 'Turkmen manat',
              currencyIso: 'TMT',
              currencySymbol: 'm'
          },
          {
              currencyName: 'Ugandan shilling',
              currencyIso: 'UGX',
              currencySymbol: 'USh'
          },
          {
              currencyName: 'Ukrainian hryvnia',
              currencyIso: 'UAH',
              currencySymbol: ''
          },
          {
              currencyName: 'dirham',
              currencyIso: 'AED',
              currencySymbol: ''
          },
          {
              currencyName: 'British pound',
              currencyIso: 'GBP',
              currencySymbol: '£'
          },
          {
              currencyName: 'United States dollar',
              currencyIso: 'USD',
              currencySymbol: 'US$'
          },
          {
              currencyName: 'Uruguayan peso',
              currencyIso: 'UYU',
              currencySymbol: '$U'
          },
          {
              currencyName: 'Uzbekistani som',
              currencyIso: 'UZS',
              currencySymbol: ''
          },
          {
              currencyName: 'Vanuatu vatu',
              currencyIso: 'VUV',
              currencySymbol: 'VT'
          },
          {
              currencyName: 'Venezuelan bolivar',
              currencyIso: 'VEB',
              currencySymbol: 'Bs'
          },
          {
              currencyName: 'Vietnamese dong',
              currencyIso: 'VND',
              currencySymbol: '₫'
          },
          
          {
              currencyName: 'tala',
              currencyIso: 'WST',
              currencySymbol: 'WS$'
          },
          {
              currencyName: 'rial',
              currencyIso: 'YER',
              currencySymbol: ''
          },
          {
              currencyName: 'Zambian kwacha',
              currencyIso: 'ZMK',
              currencySymbol: 'ZK'
          },
          {
              currencyName: 'Zimbabwean dollar',
              currencyIso: 'ZWR',
              currencySymbol: 'Z$'
          },
          {
              currencyName: 'West African CFA franc',
              currencyIso: 'XOF',
              currencySymbol: 'CFA'
          },
          {
              currencyName: 'European euro',
              currencyIso: 'EUR',
              currencySymbol: '€'
          },
        ];
        // user creation
        _.each(currency, function(currency) {
            Currency.insert({ 
                  currencyName: currency.currencyName,
                  currencyIso: currency.currencyIso,
                  currencySymbol: currency.currencySymbol
            });
        });
      }
    }, 150);
});