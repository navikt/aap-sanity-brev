import groq from 'groq'

export const query = groq`
*[_type=="mal"] {
  overskrift,
  delmaler[] {
    ...,
    obligatorisk,
    delmal -> {
      ...,
      tittel,
      teksteditor[] {
        ...,
        _type == 'block' => {
          children[] {
            ...,
            _type != 'block' => {
              ...
            },
            _type == 'faktagrunnlag' => @-> {
            ...
              }
          }
        },
        _type == 'valgRef' => {
          obligatorisk,
          valg -> {
            valg[] {
              _type == 'fritekst' => {
                ...
              },
              _type == 'reference' => @-> {
                title,
                teksteditor[] {
                  ...,
                  children[] {
                    ...,
                    _type != 'faktagrunnlag' => {
                      ...
                    },
                    _type == 'faktagrunnlag' => @-> {
                        ...
                    }
                  }
                }
              }
            }
          }
        },
        _type == 'periodetekstRef' => {
          periodetekst -> {
            ...
          }
        }
      }
    }
  }
}
`
