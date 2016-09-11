Meteor.startup(function() {
    Meteor.setTimeout(function() {
      // if countries database is empty, seed these values
      if(Countries.find().count() < 1) {
        // users array
        var countries = [
            {
                name: 'Afghanistan',
                countryCode: '93',
                isoCode: 'AF', 
                isoCodeTwo: 'AFG',
                published: false,
                currencyIso: 'AFN'
            },
            {
                name: 'Albania',
                countryCode: '355',
                isoCode: 'AL', 
                isoCodeTwo: 'ALB',
                published: false,
                currencyIso: 'ALL'
            },
            {
                name: 'Algeria',
                countryCode: '213',
                isoCode: 'DZ', 
                isoCodeTwo: 'DZA',
                published: false,
                currencyIso: 'DZD'
            },
            {
                name: 'American Samoa',
                countryCode: '1-684',
                isoCode: 'AS', 
                isoCodeTwo: 'ASM',
                published: false,
                currencyIso: 'USD'
            },
            {
                name: 'Andorra',
                countryCode: '376',
                isoCode: 'AD', 
                isoCodeTwo: 'AND',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Angola',
                countryCode: '244',
                isoCode: 'AO', 
                isoCodeTwo: 'AGO',
                published: false,
                currencyIso: 'AOA'
            },
            {
                name: 'Anguilla',
                countryCode: '1-264',
                isoCode: 'AI', 
                isoCodeTwo: 'AIA',
                published: false,
                currencyIso: 'XCD'
            },
            {
                name: 'Antarctica',
                countryCode: '672',
                isoCode: 'AQ', 
                isoCodeTwo: 'ATA',
                published: false,
                currencyIso: ''
            },
            {
                name: 'Antigua and Barbuda',
                countryCode: '1-268',
                isoCode: 'AG', 
                isoCodeTwo: 'ATG',
                published: false,
                currencyIso: 'XCD'
            },
            {
                name: 'Argentina',
                countryCode: '54',
                isoCode: 'AR', 
                isoCodeTwo: 'ARG',
                published: false,
                currencyIso: 'ARS'
            },
            {
                name: 'Armenia',
                countryCode: '374',
                isoCode: 'AM', 
                isoCodeTwo: 'ARM',
                published: false,
                currencyIso: 'AMD'
            },
            {
                name: 'Aruba',
                countryCode: '297',
                isoCode: 'AW', 
                isoCodeTwo: 'ABW',
                published: false,
                currencyIso: 'AWG'
            },
            {
                name: 'Australia',
                countryCode: '61',
                isoCode: 'AU', 
                isoCodeTwo: 'AUS',
                published: false,
                currencyIso: 'AUD'
            },
            {
                name: 'Austria',
                countryCode: '43',
                isoCode: 'AT', 
                isoCodeTwo: 'AUT',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Azerbaijan',
                countryCode: '994',
                isoCode: 'AZ', 
                isoCodeTwo: 'AZE',
                published: false,
                currencyIso: 'AZN'
            },
            {
                name: 'Bahamas',
                countryCode: '1-242',
                isoCode: 'BS', 
                isoCodeTwo: 'BHS',
                published: false,
                currencyIso: 'BSD'
            },
            {
                name: 'Bahrain',
                countryCode: '973',
                isoCode: 'BH', 
                isoCodeTwo: 'BHR',
                published: false,
                currencyIso: 'BHD'
            },
            {
                name: 'Bangladesh',
                countryCode: '880',
                isoCode: 'BD', 
                isoCodeTwo: 'BGD',
                published: false,
                currencyIso: 'BDT'
            },
            {
                name: 'Barbados',
                countryCode: '1-246',
                isoCode: 'BB', 
                isoCodeTwo: 'BRB',
                published: false,
                currencyIso: 'BBD'
            },
            {
                name: 'Belarus',
                countryCode: '375',
                isoCode: 'BY', 
                isoCodeTwo: 'BLR',
                published: false,
                currencyIso: 'BYR'
            },
            {
                name: 'Belgium',
                countryCode: '32',
                isoCode: 'BE', 
                isoCodeTwo: 'BEL',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Belize',
                countryCode: '501',
                isoCode: 'BZ', 
                isoCodeTwo: 'BLZ',
                published: false,
                currencyIso: 'BZD'
            },
            {
                name: 'Benin',
                countryCode: '229',
                isoCode: 'BJ', 
                isoCodeTwo: 'BEN',
                published: false,
                currencyIso: 'XOF'
            },
            {
                name: 'Bermuda',
                countryCode: '1-441',
                isoCode: 'BM', 
                isoCodeTwo: 'BMU',
                published: false,
                currencyIso: 'BMD'
            },
            {
                name: 'Bhutan',
                countryCode: '975',
                isoCode: 'BT', 
                isoCodeTwo: 'BTN',
                published: false,
                currencyIso: 'BTN'
            },
            {
                name: 'Bolivia',
                countryCode: '591',
                isoCode: 'BO', 
                isoCodeTwo: 'BOL',
                published: false,
                currencyIso: 'BOB'
            },
            {
                name: 'Bosnia and Herzegovina',
                countryCode: '387',
                isoCode: 'BA', 
                isoCodeTwo: 'BIH',
                published: false,
                currencyIso: 'BAM'
            },
            {
                name: 'Botswana',
                countryCode: '267',
                isoCode: 'BW', 
                isoCodeTwo: 'BWA',
                published: false,
                currencyIso: 'BWP'
            },
            {
                name: 'Brazil',
                countryCode: '55',
                isoCode: 'BR', 
                isoCodeTwo: 'BRA',
                published: false,
                currencyIso: 'BRL'
            },
            {
                name: 'British Indian Ocean Territory',
                countryCode:  '246',
                isoCode: 'IO', 
                isoCodeTwo: 'IOT',
                published: false,
                currencyIso: 'GBP'
            },
            {
                name: 'British Virgin Islands',
                countryCode: '1-284',
                isoCode: 'VG', 
                isoCodeTwo: 'VGB',
                published: false,
                currencyIso: 'GBP'
            },
            {
                name: 'Brunei',
                countryCode: '673',
                isoCode: 'BN', 
                isoCodeTwo: 'BRN',
                published: false,
                currencyIso: 'BND'
            },
            {
                name: 'Bulgaria',
                countryCode: '359',
                isoCode: 'BG', 
                isoCodeTwo: 'BGR',
                published: false,
                currencyIso: 'BGN'
            },
            {
                name: 'Burkina Faso',
                countryCode: '226',
                isoCode: 'BF', 
                isoCodeTwo: 'BFA',
                published: false,
                currencyIso: 'XOF'
            },
            {
                name: 'Burundi',
                countryCode: '257',
                isoCode: 'BI', 
                isoCodeTwo: 'BDI',
                published: false,
                currencyIso: 'BIF'
            },
            {
                name: 'Cambodia',
                countryCode: '855',
                isoCode: 'KH', 
                isoCodeTwo: 'KHM',
                published: false,
                currencyIso: 'KHR'
            },
            {
                name: 'Cameroon',
                countryCode: '237',
                isoCode: 'CM', 
                isoCodeTwo: 'CMR',
                published: false,
                currencyIso: 'XAF'
            },
            {
                name: 'Canada',
                countryCode: '1',
                isoCode: 'CA', 
                isoCodeTwo: 'CAN',
                published: false,
                currencyIso: 'CAD'
            },
            {
                name: 'Cape Verde',
                countryCode: '238',
                isoCode: 'CV', 
                isoCodeTwo: 'CPV',
                published: false,
                currencyIso: 'CVE'
            },
            {
                name: 'Cayman Islands',
                countryCode: '1-345',
                isoCode: 'KY', 
                isoCodeTwo: 'CYM',
                published: false,
                currencyIso: 'KYD'
            },
            {
                name: 'Central African Republic',
                countryCode: '236',
                isoCode: 'CF', 
                isoCodeTwo: 'CAF',
                published: false,
                currencyIso: 'XAF'
            },
            {
                name: 'Chad',
                countryCode: '235',
                isoCode: 'TD', 
                isoCodeTwo: 'TCD',
                published: false,
                currencyIso: 'XAF'
            },
            {
                name: 'Chile',
                countryCode: '56',
                isoCode: 'CL', 
                isoCodeTwo: 'CHL',
                published: false,
                currencyIso: 'CLP'
            },
            {
                name: 'China',
                countryCode: '86',
                isoCode: 'CN', 
                isoCodeTwo: 'CHN',
                published: false,
                currencyIso: 'CNY'
            },
            {
                name: 'Christmas Island',
                countryCode: '61',
                isoCode: 'CX', 
                isoCodeTwo: 'CXR',
                published: false,
                currencyIso: 'AUD'
            },
            {
                name: 'Cocos Islands',
                countryCode: '61',
                isoCode: 'CC', 
                isoCodeTwo: 'CCK',
                published: false,
                currencyIso: 'AUD'
            },
            {
                name: 'Colombia',
                countryCode: '57',
                isoCode: 'CO', 
                isoCodeTwo: 'COL',
                published: false,
                currencyIso: 'COP'
            },
            {
                name: 'Comoros',
                countryCode: '269',
                isoCode: 'KM', 
                isoCodeTwo: 'COM',
                published: false,
                currencyIso: 'KMF'
            },
            {
                name: 'Cook Islands',
                countryCode: '682',
                isoCode: 'CK', 
                isoCodeTwo: 'COK',
                published: false,
                currencyIso: 'NZD'
            },
            {
                name: 'Costa Rica',
                countryCode: '506',
                isoCode: 'CR', 
                isoCodeTwo: 'CRI',
                published: false,
                currencyIso: 'CRC'
            },
            {
                name: 'Croatia',
                countryCode: '385',
                isoCode: 'HR', 
                isoCodeTwo: 'HRV',
                published: false,
                currencyIso: 'HRK'
            },
            {
                name: 'Cuba',
                countryCode: '53',
                isoCode: 'CU', 
                isoCodeTwo: 'CUB',
                published: false,
                currencyIso: 'CUC'
            },
            {
                name: 'Curacao',
                countryCode: '599',
                isoCode: 'CW', 
                isoCodeTwo: 'CUW',
                published: false,
                currencyIso: ''
            },
            {
                name: 'Cyprus',
                countryCode: '357',
                isoCode: 'CY', 
                isoCodeTwo: 'CYP',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Czech Republic',
                countryCode: '420',
                isoCode: 'CZ', 
                isoCodeTwo: 'CZE',
                published: false,
                currencyIso: 'CZK'
            },
            {
                name: 'Democratic Republic of the Congo',
                countryCode:  '243',
                isoCode: 'CD', 
                isoCodeTwo: 'COD',
                published: false,
                currencyIso: 'CDF'
          },
            {
                name: 'Denmark',
                countryCode: '45',
                isoCode: 'DK', 
                isoCodeTwo: 'DNK',
                published: false,
                currencyIso: 'DKK'
            },
            {
                name: 'Djibouti',
                countryCode: '253',
                isoCode: 'DJ', 
                isoCodeTwo: 'DJI',
                published: false,
                currencyIso: 'DJF'
            },
            {
                name: 'Dominica',
                countryCode: '1-767',
                isoCode: 'DM', 
                isoCodeTwo: 'DMA',
                published: false,
                currencyIso: 'XCD'
            },
            {
                name: 'East Timor',
                countryCode: '670',
                isoCode: 'TL', 
                isoCodeTwo: 'TLS',
                published: false,
                currencyIso: 'USD'
            },
            {
                name: 'Ecuador',
                countryCode: '593',
                isoCode: 'EC', 
                isoCodeTwo: 'ECU',
                published: false,
                currencyIso: 'USD'
            },
            {
                name: 'Egypt',
                countryCode: '20',
                isoCode: 'EG', 
                isoCodeTwo: 'EGY',
                published: false,
                currencyIso: 'EGP'
            },
            {
                name: 'El Salvador',
                countryCode: '503',
                isoCode: 'SV', 
                isoCodeTwo: 'SLV',
                published: false,
                currencyIso: 'USD'
            },
            {
                name: 'Equatorial Guinea',
                countryCode: '240',
                isoCode: 'GQ', 
                isoCodeTwo: 'GNQ',
                published: false,
                currencyIso: 'GQE'
            },
            {
                name: 'Eritrea',
                countryCode: '291',
                isoCode: 'ER', 
                isoCodeTwo: 'ERI',
                published: false,
                currencyIso: 'ERN'
            },
            {
                name: 'Estonia',
                countryCode: '372',
                isoCode: 'EE', 
                isoCodeTwo: 'EST',
                published: false,
                currencyIso: 'EEK'
            },
            {
                name: 'Ethiopia',
                countryCode: '251',
                isoCode: 'ET', 
                isoCodeTwo: 'ETH',
                published: false,
                currencyIso: 'ETB'
            },
            {
                name: 'Falkland Islands',
                countryCode: '500',
                isoCode: 'FK', 
                isoCodeTwo: 'FLK',
                published: false,
                currencyIso: 'FKP'
            },
            {
                name: 'Faroe Islands (Føroyar)',
                countryCode: '298',
                isoCode: 'FO', 
                isoCodeTwo: 'FRO',
                published: false,
                currencyIso: 'DKK'
            },
            {
                name: 'Fiji',
                countryCode: '679',
                isoCode: 'FJ', 
                isoCodeTwo: 'FJI',
                published: false,
                currencyIso: 'FJD'
            },
            {
                name: 'Finland',
                countryCode: '358',
                isoCode: 'FI', 
                isoCodeTwo: 'FIN',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'France',
                countryCode: '33',
                isoCode: 'FR', 
                isoCodeTwo: 'FRA',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'French Polynesia',
                countryCode: '689',
                isoCode: 'PF', 
                isoCodeTwo: 'PYF',
                published: false,
                currencyIso: 'XPF'
            },
            {
                name: 'Gabon',
                countryCode: '241',
                isoCode: 'GA', 
                isoCodeTwo: 'GAB',
                published: false,
                currencyIso: 'XAF'
            },
            {
                name: 'Gambia',
                countryCode: '220',
                isoCode: 'GM', 
                isoCodeTwo: 'GMB',
                published: false,
                currencyIso: 'GMD'
            },
            {
                name: 'Georgia',
                countryCode: '995',
                isoCode: 'GE', 
                isoCodeTwo: 'GEO',
                published: false,
                currencyIso: 'GEL'
            },
            {
                name: 'Germany',
                countryCode: '49',
                isoCode: 'DE', 
                isoCodeTwo: 'DEU',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Ghana',
                countryCode: '233',
                isoCode: 'GH', 
                isoCodeTwo: 'GHA',
                published: false,
                currencyIso: 'GHS'
            },
            {
                name: 'Gibraltar',
                countryCode: '350',
                isoCode: 'GI', 
                isoCodeTwo: 'GIB',
                published: false,
                currencyIso: 'GIP'
            },
            {
                name: 'Greece',
                countryCode: '30',
                isoCode: 'GR', 
                isoCodeTwo: 'GRC',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Greenland',
                countryCode: '299',
                isoCode: 'GL', 
                isoCodeTwo: 'GRL',
                published: false,
                currencyIso: 'DKK'
            },
            {
                name: 'Grenada',
                countryCode: '1-473',
                isoCode: 'GD', 
                isoCodeTwo: 'GRD',
                published: false,
                currencyIso: 'XCD'
            },
            {
                name: 'Guam',
                countryCode: '1-671',
                isoCode: 'GU', 
                isoCodeTwo: 'GUM',
                published: false,
                currencyIso: 'USD'
            },
            {
                name: 'Guatemala',
                countryCode: '502',
                isoCode: 'GT', 
                isoCodeTwo: 'GTM',
                published: false,
                currencyIso: 'GTQ'
            },
            {
                name: 'Guernsey',
                countryCode: '44-1481',
                isoCode: 'GG', 
                isoCodeTwo: 'GGY',
                published: false,
                currencyIso: 'GBP'
            },
            {
                name: 'Guinea',
                countryCode: '224',
                isoCode: 'GN', 
                isoCodeTwo: 'GIN',
                published: false,
                currencyIso: 'GNF'
            },
            {
                name: 'Guinea-Bissau',
                countryCode: '245',
                isoCode: 'GW', 
                isoCodeTwo: 'GNB',
                published: false,
                currencyIso: 'XOF'
            },
            {
                name: 'Guyana',
                countryCode: '592',
                isoCode: 'GY', 
                isoCodeTwo: 'GUY',
                published: false,
                currencyIso: 'GYD'
            },
            {
                name: 'Haiti',
                countryCode: '509',
                isoCode: 'HT', 
                isoCodeTwo: 'HTI',
                published: false,
                currencyIso: 'HTG'
            },
            {
                name: 'Honduras',
                countryCode: '504',
                isoCode: 'HN', 
                isoCodeTwo: 'HND',
                published: false,
                currencyIso: 'HNL'
            },
            {
                name: 'Hong Kong',
                countryCode: '852',
                isoCode: 'HK', 
                isoCodeTwo: 'HKG',
                published: false,
                currencyIso: 'HKD'
            },
            {
                name: 'Hungary',
                countryCode: '36',
                isoCode: 'HU', 
                isoCodeTwo: 'HUN',
                published: false,
                currencyIso: 'HUF'
            },
            {
                name: 'Iceland',
                countryCode: '354',
                isoCode: 'IS', 
                isoCodeTwo: 'ISL',
                published: false,
                currencyIso: 'ISK'
            },
            {
                name: 'India',
                countryCode: '91',
                isoCode: 'IN', 
                isoCodeTwo: 'IND',
                published: false,
                currencyIso: 'INR'
            },
            {
                name: 'Indonesia',
                countryCode: '62',
                isoCode: 'ID', 
                isoCodeTwo: 'IDN',
                published: false,
                currencyIso: 'IDR'
            },
            {
                name: 'Iran',
                countryCode: '98',
                isoCode: 'IR', 
                isoCodeTwo: 'IRN',
                published: false,
                currencyIso: 'IRR'
            },
            {
                name: 'Iraq',
                countryCode: '964',
                isoCode: 'IQ', 
                isoCodeTwo: 'IRQ',
                published: false,
                currencyIso: 'IQD'
            },
            {
                name: 'Ireland',
                countryCode: '353',
                isoCode: 'IE', 
                isoCodeTwo: 'IRL',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Isle of Man',
                countryCode: '44-1624',
                isoCode: 'IM', 
                isoCodeTwo: 'IMN',
                published: false,
                currencyIso: 'GBP'
            },
            {
                name: 'Israel',
                countryCode: '972',
                isoCode: 'IL', 
                isoCodeTwo: 'ISR',
                published: false,
                currencyIso: 'ILS'
            },
            {
                name: 'Italy',
                countryCode: '39',
                isoCode: 'IT', 
                isoCodeTwo: 'ITA',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Ivory Coast',
                countryCode: '225',
                isoCode: 'CI', 
                isoCodeTwo: 'CIV',
                published: false,
                currencyIso: 'XOF'
            },
            {
                name: 'Jamaica',
                countryCode: '1-876',
                isoCode: 'JM', 
                isoCodeTwo: 'JAM',
                published: false,
                currencyIso: 'JMD'
            },
            {
                name: 'Japan',
                countryCode: '81',
                isoCode: 'JP', 
                isoCodeTwo: 'JPN',
                published: false,
                currencyIso: 'JPY'
            },
            {
                name: 'Jersey',
                countryCode: '44-1534',
                isoCode: 'JE', 
                isoCodeTwo: 'JEY',
                published: false,
                currencyIso: 'GBP'
            },
            {
                name: 'Jordan',
                countryCode: '962',
                isoCode: 'JO', 
                isoCodeTwo: 'JOR',
                published: false,
                currencyIso: 'JOD'
            },
            {
                name: 'Kazakhstan',
                countryCode: '7',
                isoCode: 'KZ', 
                isoCodeTwo: 'KAZ',
                published: false,
                currencyIso: 'KZT'
            },
            {
                name: 'Kenya',
                countryCode: '254',
                isoCode: 'KE', 
                isoCodeTwo: 'KEN',
                published: false,
                currencyIso: 'KES'
            },
            {
                name: 'Kiribati',
                countryCode: '686',
                isoCode: 'KI', 
                isoCodeTwo: 'KIR',
                published: false,
                currencyIso: 'AUD'
            },
            {
                name: 'Kosovo',
                countryCode: '383',
                isoCode: 'XK', 
                isoCodeTwo: 'XKX',
                published: false,
                currencyIso: ''
            },
            {
                name: 'Kuwait',
                countryCode: '965',
                isoCode: 'KW', 
                isoCodeTwo: 'KWT',
                published: false,
                currencyIso: 'KWD'
            },
            {
                name: 'Kyrgyzstan',
                countryCode: '996',
                isoCode: 'KG', 
                isoCodeTwo: 'KGZ',
                published: false,
                currencyIso: 'KGS'
            },
            {
                name: 'Laos',
                countryCode: '856',
                isoCode: 'LA', 
                isoCodeTwo: 'LAO',
                published: false,
                currencyIso: 'LAK'
            },
            {
                name: 'Latvia',
                countryCode: '371',
                isoCode: 'LV', 
                isoCodeTwo: 'LVA',
                published: false,
                currencyIso: 'LVL'
            },
            {
                name: 'Lebanon',
                countryCode: '961',
                isoCode: 'LB', 
                isoCodeTwo: 'LBN',
                published: false,
                currencyIso: 'LBP'
            },
            {
                name: 'Lesotho',
                countryCode: '266',
                isoCode: 'LS', 
                isoCodeTwo: 'LSO',
                published: false,
                currencyIso: 'LSL'
            },
            {
                name: 'Liberia',
                countryCode: '231',
                isoCode: 'LR', 
                isoCodeTwo: 'LBR',
                published: false,
                currencyIso: 'LRD'
            },
            {
                name: 'Libya',
                countryCode: '218',
                isoCode: 'LY', 
                isoCodeTwo: 'LBY',
                published: false,
                currencyIso: 'LYD'
            },
            {
                name: 'Liechtenstein',
                countryCode: '423',
                isoCode: 'LI', 
                isoCodeTwo: 'LIE',
                published: false,
                currencyIso:'CHF'
            },
            {
                name: 'Lithuania',
                countryCode: '370',
                isoCode: 'LT', 
                isoCodeTwo: 'LTU',
                published: false,
                currencyIso: 'LTL'
            },
            {
                name: 'Luxembourg',
                countryCode: '352',
                isoCode: 'LU', 
                isoCodeTwo: 'LUX',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Macao',
                countryCode: '853',
                isoCode: 'MO', 
                isoCodeTwo: 'MAC',
                published: false,
                currencyIso: 'MOP'
            },
            {
                name: 'Macedonia',
                countryCode: '389',
                isoCode: 'MK', 
                isoCodeTwo: 'MKD',
                published: false,
                currencyIso: 'MKD'
            },
            {
                name: 'Madagascar',
                countryCode: '261',
                isoCode: 'MG', 
                isoCodeTwo: 'MDG',
                published: false,
                currencyIso: 'MGA'
            },
            {
                name: 'Malawi',
                countryCode: '265',
                isoCode: 'MW', 
                isoCodeTwo: 'MWI',
                published: false,
                currencyIso: 'MWK'
            },
            {
                name: 'Malaysia',
                countryCode: '60',
                isoCode: 'MY', 
                isoCodeTwo: 'MYS',
                published: false,
                currencyIso: 'MYR'
            },
            {
                name: 'Maldives',
                countryCode: '960',
                isoCode: 'MV', 
                isoCodeTwo: 'MDV',
                published: false,
                currencyIso: 'MVR'
            },
            {
                name: 'Mali',
                countryCode: '223',
                isoCode: 'ML', 
                isoCodeTwo: 'MLI',
                published: false,
                currencyIso: 'XOF'
            },
            {
                name: 'Malta',
                countryCode: '356',
                isoCode: 'MT', 
                isoCodeTwo: 'MLT',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Marshall Islands',
                countryCode: '692',
                isoCode: 'MH', 
                isoCodeTwo: 'MHL',
                published: false,
                currencyIso: ''
            },
            {
                name: 'Mauritania',
                countryCode: '222',
                isoCode: 'MR', 
                isoCodeTwo: 'MRT',
                published: false,
                currencyIso: 'MRO'
            },
            {
                name: 'Mauritius',
                countryCode: '230',
                isoCode: 'MU', 
                isoCodeTwo: 'MUS',
                published: false,
                currencyIso: 'MUR'
            },
            {
                name: 'Mayotte',
                countryCode: '262',
                isoCode: 'YT', 
                isoCodeTwo: 'MYT',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Mexico',
                countryCode: '52',
                isoCode: 'MX', 
                isoCodeTwo: 'MEX',
                published: false,
                currencyIso: 'MXN'
            },
            {
                name: 'Micronesia',
                countryCode: '691',
                isoCode: 'FM', 
                isoCodeTwo: 'FSM',
                published: false,
                currencyIso: 'USD'
            },
            {
                name: 'Moldova',
                countryCode: '373',
                isoCode: 'MD', 
                isoCodeTwo: 'MDA',
                published: false,
                currencyIso: 'MDL'
            },
            {
                name: 'Monaco',
                countryCode: '377',
                isoCode: 'MC', 
                isoCodeTwo: 'MCO',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Mongolia',
                countryCode: '976',
                isoCode: 'MN', 
                isoCodeTwo: 'MNG',
                published: false,
                currencyIso: 'MNT'
            },
            {
                name: 'Montenegro',
                countryCode: '382',
                isoCode: 'ME', 
                isoCodeTwo: 'MNE',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Montserrat',
                countryCode: '1-664',
                isoCode: 'MS', 
                isoCodeTwo: 'MSR',
                published: false,
                currencyIso: 'XCD'
            },
            {
                name: 'Morocco',
                countryCode: '212',
                isoCode: 'MA', 
                isoCodeTwo: 'MAR',
                published: false,
                currencyIso: 'MAD'
            },
            {
                name: 'Mozambique',
                countryCode: '258',
                isoCode: 'MZ', 
                isoCodeTwo: 'MOZ',
                published: false,
                currencyIso: 'MZM'
            },
            {
                name: 'Myanmar',
                countryCode: '95',
                isoCode: 'MM', 
                isoCodeTwo: 'MMR',
                published: false,
                currencyIso: 'MMK'
            },
            {
                name: 'Namibia',
                countryCode: '264',
                isoCode: 'NA', 
                isoCodeTwo: 'NAM',
                published: false,
                currencyIso: 'NAD'
            },
            {
                name: 'Nauru',
                countryCode: '674',
                isoCode: 'NR', 
                isoCodeTwo: 'NRU',
                published: false,
                currencyIso: 'AUD'
            },
            {
                name: 'Nepal',
                countryCode: '977',
                isoCode: 'NP', 
                isoCodeTwo: 'NPL',
                published: false,
                currencyIso: 'NPR'
            },
            {
                name: 'Netherlands',
                countryCode: '31',
                isoCode: 'NL', 
                isoCodeTwo: 'NLD',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Netherlands Antilles',
                countryCode: '599',
                isoCode: 'AN', 
                isoCodeTwo: 'ANT',
                published: false,
                currencyIso: 'ANG'
            },
            {
                name: 'New Caledonia',
                countryCode: '687',
                isoCode: 'NC', 
                isoCodeTwo: 'NCL',
                published: false,
                currencyIso: 'XPF'
            },
            {
                name: 'New Zealand',
                countryCode: '64',
                isoCode: 'NZ', 
                isoCodeTwo: 'NZL',
                published: false,
                currencyIso: 'NZD'
            },
            {
                name: 'Nicaragua',
                countryCode: '505',
                isoCode: 'NI', 
                isoCodeTwo: 'NIC',
                published: false,
                currencyIso: 'NIO'
            },
            {
                name: 'Niger',
                countryCode: '227',
                isoCode: 'NE', 
                isoCodeTwo: 'NER',
                published: false,
                currencyIso: 'XOF'
            },
            {
                name: 'Nigeria',
                countryCode: '234',
                isoCode: 'NG', 
                isoCodeTwo: 'NGA',
                published: false,
                currencyIso: 'NGN'
            },
            {
                name: 'Niue',
                countryCode: '683',
                isoCode: 'NU', 
                isoCodeTwo: 'NIU',
                published: false,
                currencyIso: 'NZD'
            },
            {
                name: 'North Korea',
                countryCode: '850',
                isoCode: 'KP', 
                isoCodeTwo: 'PRK',
                published: false,
                currencyIso: ''
            },
            {
                name: 'Northern Mariana Islands',
                countryCode:  '1-670',
                isoCode: 'MP', 
                isoCodeTwo: 'MNP',
                published: false,
                currencyIso: 'USD'
            },
            {
                name: 'Norway',
                countryCode: '47',
                isoCode: 'NO', 
                isoCodeTwo: 'NOR',
                published: true,
                currencyIso: 'NOK'
            },
            {
                name: 'Oman',
                countryCode: '968',
                isoCode: 'OM', 
                isoCodeTwo: 'OMN',
                published: false,
                currencyIso: 'OMR'
            },
            {
                name: 'Pakistan',
                countryCode: '92',
                isoCode: 'PK', 
                isoCodeTwo: 'PAK',
                published: false,
                currencyIso: 'PKR'
            },
            {
                name: 'Palau',
                countryCode: '680',
                isoCode: 'PW', 
                isoCodeTwo: 'PLW',
                published: false,
                currencyIso: 'USD'
            },
            {
                name: 'Palestine',
                countryCode: '970',
                isoCode: 'PS', 
                isoCodeTwo: 'PSE',
                published: false,
                currencyIso: ''
            },
            {
                name: 'Panama',
                countryCode: '507',
                isoCode: 'PA', 
                isoCodeTwo: 'PAN',
                published: false,
                currencyIso: 'PAB'
            },
            {
                name: 'Papua New Guinea',
                countryCode: '675',
                isoCode: 'PG', 
                isoCodeTwo: 'PNG',
                published: false,
                currencyIso: 'PGK'
            },
            {
                name: 'Paraguay',
                countryCode: '595',
                isoCode: 'PY', 
                isoCodeTwo: 'PRY',
                published: false,
                currencyIso: 'PYG'
            },
            {
                name: 'Peru',
                countryCode: '51',
                isoCode: 'PE', 
                isoCodeTwo: 'PER',
                published: false,
                currencyIso: 'PEN'
            },
            {
                name: 'Philippines',
                countryCode: '63',
                isoCode: 'PH', 
                isoCodeTwo: 'PHL',
                published: false,
                currencyIso: 'PHP'
            },
            {
                name: 'Pitcairn',
                countryCode: '64',
                isoCode: 'PN', 
                isoCodeTwo: 'PCN',
                published: false,
                currencyIso: 'NZD'
            },
            {
                name: 'Poland',
                countryCode: '48',
                isoCode: 'PL', 
                isoCodeTwo: 'POL',
                published: false,
                currencyIso: 'PLN'
            },
            {
                name: 'Portugal',
                countryCode: '351',
                isoCode: 'PT', 
                isoCodeTwo: 'PRT',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Qatar',
                countryCode: '974',
                isoCode: 'QA', 
                isoCodeTwo: 'QAT',
                published: false,
                currencyIso: 'QAR'
            },
            {
                name: 'Republic of the Congo',
                countryCode: '242',
                isoCode: 'CG', 
                isoCodeTwo: 'COG',
                published: false,
                currencyIso: ''
            },
            {
                name: 'Reunion',
                countryCode: '262',
                isoCode: 'RE', 
                isoCodeTwo: 'REU',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Romania',
                countryCode: '40',
                isoCode: 'RO', 
                isoCodeTwo: 'ROU',
                published: false,
                currencyIso: 'RON'
            },
            {
                name: 'Russia',
                countryCode: '7',
                isoCode: 'RU', 
                isoCodeTwo: 'RUS',
                published: false,
                currencyIso: 'RUB'
            },
            {
                name: 'Rwanda',
                countryCode: '250',
                isoCode: 'RW', 
                isoCodeTwo: 'RWA',
                published: false,
                currencyIso: 'RWF'
            },
            {
                name: 'Saint Barthelemy',
                countryCode: '590',
                isoCode: 'BL', 
                isoCodeTwo: 'BLM',
                published: false,
                currencyIso: ''
            },
            {
                name: 'Saint Helena',
                countryCode: '290',
                isoCode: 'SH', 
                isoCodeTwo: 'SHN',
                published: false,
                currencyIso: 'SHP'
            },
            {
                name: 'Saint Kitts and Nevis',
                countryCode: '1-869',
                isoCode: 'KN', 
                isoCodeTwo: 'KNA',
                published: false,
                currencyIso: 'XCD'
            },
            {
                name: 'Saint Lucia',
                countryCode: '1-758',
                isoCode: 'LC', 
                isoCodeTwo: 'LCA',
                published: false,
                currencyIso: 'XCD'
            },
            {
                name: 'Saint Martin',
                countryCode: '590',
                isoCode: 'MF', 
                isoCodeTwo: 'MAF',
                published: false,
                currencyIso: ''
            },
            {
                name: 'Saint Pierre and Miquelon',
                countryCode: '508',
                isoCode: 'PM', 
                isoCodeTwo: 'SPM',
                published: false,
                currencyIso: ''
            },
            {
                name: 'Saint Vincent and the Grenadines',
                countryCode: '1-784',
                isoCode: 'VC', 
                isoCodeTwo: 'VCT',
                published: false,
                currencyIso: 'XCD'
            },
            {
                name: 'Samoa',
                countryCode: '685',
                isoCode: 'WS', 
                isoCodeTwo: 'WSM',
                published: false,
                currencyIso: 'WST'
            },
            {
                name: 'San Marino',
                countryCode: '378',
                isoCode: 'SM', 
                isoCodeTwo: 'SMR',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Sao Tome and Principe',
                countryCode: '239',
                isoCode: 'ST', 
                isoCodeTwo: 'STP',
                published: false,
                currencyIso: 'STD'
            },
            {
                name: 'Saudi Arabia',
                countryCode: '966',
                isoCode: 'SA', 
                isoCodeTwo: 'SAU',
                published: false,
                currencyIso: 'SAR'
            },
            {
                name: 'Senegal',
                countryCode: '221',
                isoCode: 'SN', 
                isoCodeTwo: 'SEN',
                published: false,
                currencyIso: 'XOF'
            },
            {
                name: 'Serbia',
                countryCode: '381',
                isoCode: 'RS', 
                isoCodeTwo: 'SRB',
                published: false,
                currencyIso: 'RSD'
            },
            {
                name: 'Seychelles',
                countryCode: '248',
                isoCode: 'SC', 
                isoCodeTwo: 'SYC',
                published: false,
                currencyIso: 'SCR'
            },
            {
                name: 'Sierra Leone',
                countryCode: '232',
                isoCode: 'SL', 
                isoCodeTwo: 'SLE',
                published: false,
                currencyIso: 'SLL'
            },
            {
                name: 'Singapore',
                countryCode: '65',
                isoCode: 'SG', 
                isoCodeTwo: 'SGP',
                published: false,
                currencyIso: 'SGD'
            },
            {
                name: 'Sint Maarten',
                countryCode: '1-721',
                isoCode: 'SX', 
                isoCodeTwo: 'SXM',
                published: false,
                currencyIso: ''
            },
            {
                name: 'Slovakia',
                countryCode: '421',
                isoCode: 'SK', 
                isoCodeTwo: 'SVK',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Slovenia',
                countryCode: '386',
                isoCode: 'SI', 
                isoCodeTwo: 'SVN',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Solomon Islands',
                countryCode: '677',
                isoCode: 'SB', 
                isoCodeTwo: 'SLB',
                published: false,
                currencyIso: 'SBD'
            },
            {
                name: 'Somalia',
                countryCode: '252',
                isoCode: 'SO', 
                isoCodeTwo: 'SOM',
                published: false,
                currencyIso: 'SOS'
            },
            {
                name: 'South Africa',
                countryCode: '27',
                isoCode: 'ZA', 
                isoCodeTwo: 'ZAF',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'South Korea',
                countryCode: '82',
                isoCode: 'KR', 
                isoCodeTwo: 'KOR',
                published: false,
                currencyIso: ''
            },
            {
                name: 'South Sudan',
                countryCode: '211',
                isoCode: 'SS', 
                isoCodeTwo: 'SSD',
                published: false,
                currencyIso: 'ZAR'
            },
            {
                name: 'Spain',
                countryCode: '34',
                isoCode: 'ES', 
                isoCodeTwo: 'ESP',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Sri Lanka',
                countryCode: '94',
                isoCode: 'LK', 
                isoCodeTwo: 'LKA',
                published: false,
                currencyIso: 'LKR'
            },
            {
                name: 'Sudan',
                countryCode: '249',
                isoCode: 'SD', 
                isoCodeTwo: 'SDN',
                published: false,
                currencyIso: 'SDG'
            },
            {
                name: 'Suriname',
                countryCode: '597',
                isoCode: 'SR', 
                isoCodeTwo: 'SUR',
                published: false,
                currencyIso: 'SRD'
            },
            {
                name: 'Svalbard and Jan Mayen',
                countryCode: '47',
                isoCode: 'SJ', 
                isoCodeTwo: 'SJM',
                published: false,
                currencyIso: 'NOK'
            },
            {
                name: 'Swaziland',
                countryCode: '268',
                isoCode: 'SZ', 
                isoCodeTwo: 'SWZ',
                published: false,
                currencyIso: 'SZL'
            },
            {
                name: 'Sweden',
                countryCode: '46',
                isoCode: 'SE', 
                isoCodeTwo: 'SWE',
                published: true,
                currencyIso: 'SEK'
            },
            {
                name: 'Switzerland',
                countryCode: '41',
                isoCode: 'CH', 
                isoCodeTwo: 'CHE',
                published: false,
                currencyIso: 'CHF'
            },
            {
                name: 'Syria',
                countryCode: '963',
                isoCode: 'SY', 
                isoCodeTwo: 'SYR',
                published: false,
                currencyIso: 'SYP'
            },
            {
                name: 'Taiwan',
                countryCode: '886',
                isoCode: 'TW', 
                isoCodeTwo: 'TWN',
                published: false,
                currencyIso: 'TWD'
            },
            {
                name: 'Tajikistan',
                countryCode: '992',
                isoCode: 'TJ', 
                isoCodeTwo: 'TJK',
                published: false,
                currencyIso: 'TJS'
            },
            {
                name: 'Tanzania',
                countryCode: '255',
                isoCode: 'TZ', 
                isoCodeTwo: 'TZA',
                published: false,
                currencyIso: 'TZS'
            },
            {
                name: 'Thailand',
                countryCode: '66',
                isoCode: 'TH', 
                isoCodeTwo: 'THA',
                published: false,
                currencyIso: 'THB'
            },
            {
                name: 'Togo',
                countryCode: '228',
                isoCode: 'TG', 
                isoCodeTwo: 'TGO',
                published: false,
                currencyIso: 'XOF'
            },
            {
                name: 'Tokelau',
                countryCode: '690',
                isoCode: 'TK', 
                isoCodeTwo: 'TKL',
                published: false,
                currencyIso: ''
            },
            {
                name: 'Tonga',
                countryCode: '676',
                isoCode: 'TO', 
                isoCodeTwo: 'TON',
                published: false,
                currencyIso: ''
            },
            {
                name: 'Trinidad and Tobago',
                countryCode: '1-868',
                isoCode: 'TT', 
                isoCodeTwo: 'TTO',
                published: false,
                currencyIso: 'TTD'
            },
            {
                name: 'Tunisia',
                countryCode: '216',
                isoCode: 'TN', 
                isoCodeTwo: 'TUN',
                published: false,
                currencyIso: 'TND'
            },
            {
                name: 'Turkey',
                countryCode: '90',
                isoCode: 'TR', 
                isoCodeTwo: 'TUR',
                published: false,
                currencyIso: 'TRY'
            },
            {
                name: 'Turkmenistan',
                countryCode: '993',
                isoCode: 'TM', 
                isoCodeTwo: 'TKM',
                published: false,
                currencyIso: 'TMT'
            },
            {
                name: 'Turks and Caicos Islands',
                countryCode: '1-649',
                isoCode: 'TC', 
                isoCodeTwo: 'TCA',
                published: false,
                currencyIso: 'USD'
            },
            {
                name: 'Tuvalu',
                countryCode: '688',
                isoCode: 'TV', 
                isoCodeTwo: 'TUV',
                published: false,
                currencyIso: 'AUD'
            },
            {
                name: 'U.S. Virgin Islands',
                countryCode: '1-340',
                isoCode: 'VI', 
                isoCodeTwo: 'VIR',
                published: false,
                currencyIso:'USD'
            },
            {
                name: 'Uganda',
                countryCode: '256',
                isoCode: 'UG', 
                isoCodeTwo: 'UGA',
                published: false,
                currencyIso: 'UGX'
            },
            {
                name: 'Ukraine',
                countryCode: '380',
                isoCode: 'UA', 
                isoCodeTwo: 'UKR',
                published: false,
                currencyIso: 'UAH'
            },
            {
                name: 'United Arab Emirates',
                countryCode: '971',
                isoCode: 'AE', 
                isoCodeTwo: 'ARE',
                published: false,
                currencyIso: 'AED'
            },
            {
                name: 'United Kingdom',
                countryCode: '44',
                isoCode: 'GB', 
                isoCodeTwo: 'GBR',
                published: false,
                currencyIso: 'GBP'
            },
            {
                name: 'United States',
                countryCode: '1',
                isoCode: 'US', 
                isoCodeTwo: 'USA',
                published: false,
                currencyIso: 'USD'
            },
            {
                name: 'Uruguay',
                countryCode: '598',
                isoCode: 'UY', 
                isoCodeTwo: 'URY',
                published: false,
                currencyIso: 'UYU'
            },
            {
                name: 'Uzbekistan',
                countryCode: '998',
                isoCode: 'UZ', 
                isoCodeTwo: 'UZB',
                published: false,
                currencyIso: 'UZS'
            },
            {
                name: 'Vanuatu',
                countryCode: '678',
                isoCode: 'VU', 
                isoCodeTwo: 'VUT',
                published: false,
                currencyIso: 'VUV'
            },
            {
                name: 'Vatican',
                countryCode: '379',
                isoCode: 'VA', 
                isoCodeTwo: 'VAT',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Venezuela',
                countryCode: '58',
                isoCode: 'VE', 
                isoCodeTwo: 'VEN',
                published: false,
                currencyIso: 'VEB'
            },
            {
                name: 'Vietnam',
                countryCode: '84',
                isoCode: 'VN', 
                isoCodeTwo: 'VNM',
                published: false,
                currencyIso: 'VND'
            },
            {
                name: 'Wallis and Futuna',
                countryCode: '681',
                isoCode: 'WF', 
                isoCodeTwo: 'WLF',
                published: false,
                currencyIso: 'XPF'
            },
            {
                name: 'Western Sahara',
                countryCode: '212',
                isoCode: 'EH', 
                isoCodeTwo: 'ESH',
                published: false,
                currencyIso: 'EUR'
            },
            {
                name: 'Yemen',
                countryCode: '967',
                isoCode: 'YE', 
                isoCodeTwo: 'YEM',
                published: false,
                currencyIso: 'YER'
            },
            {
                name: 'Zambia',
                countryCode: '260',
                isoCode: 'ZM', 
                isoCodeTwo: 'ZMB',
                published: false,
                currencyIso: 'ZMK'
            },
            {
                name: 'Zimbabwe',
                countryCode: '263',
                isoCode: 'ZW', 
                isoCodeTwo: 'ZWE',
                published: false,
                currencyIso: 'ZWR'
            },
        ];
        // user creation
        _.each(countries, function(country) {
            Countries.insert({ 
                  name: country.name,
                  countryCode: country.countryCode,
                  isoCode: country.isoCode,
                  isoCodeTwo: country.isoCodeTwo,
                  published: country.published,
                  currencyIso: country.currencyIso
            });
        });
      }
    }, 100);
});